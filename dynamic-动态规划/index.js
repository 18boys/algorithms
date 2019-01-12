/**
 * @file index.js
 * @author shuai.li
 */

// 寻找最长不含重复字符的子字符串
// 请从字符串中找出一个最长的不包含重复字符的子字符串,计算该最长字符串的长度,假设字符串中只包含a-z的字符.
// 例如 'arabcacfrt' 最长的不含重复子串的是 acfr 长度为4

// 1.暴力遍历
// 先不考虑性能
// 给一个index,算出从此index开始,最长长度是多少
// 遍历一遍整个字符串长度,然后对2步的结果排序
// 时间复杂度  n^3

function findMaxNoRepeatLength(str){
  let max =0;
  let maxStr= '';
  for(let i =0;i<str.length ; i++){
    let maybeMaxStr = '';
    let maybeMaxStrLength =0;
    for(let j= i; j<str.length;j++){
      let subStr = str.substring(i,j+1);
      if(subStr.indexOf(str[j]) === subStr.lastIndexOf(str[j])){ // 说明不重复
        maybeMaxStr= subStr;
        maybeMaxStrLength = maybeMaxStrLength+1;
        continue;
      }
      break;
    }
    if(max<=maybeMaxStrLength){
      max =maybeMaxStrLength;
      maxStr= maybeMaxStr;
    }
  }
  console.log('最长为:',max, ',此时字符串为: ',maxStr);
}

// findMaxNoRepeatLength('arabcacfr');

// 2.动态规划
// 状态: 第i个位置结束的子串最大长度为f(i),那么分析f(i-1)与f(i)的关系
// 状态转移方程:
// 如果第i个字母上次出现的位置不在f(i-1)之内,那么 f(i)=f(i-1)+1,
// 如果第i个字母上次出现的位置在f(i-1)之内,说明上次出现的位置到i之间是没有重复字母的,那么最长的长度i-p
// 如果之前没有出现过,那么f(i)=f(i-1)+1

// 2.1按照分析可以按照递归来写,也可以按照非递归的方式来写
// 时间复杂度怎么计算
// 递归的问题是: 重复计算
// 这里可以有的优化是 记录中间过程值,改善性能
function findLongestSubStringWithoutDuplicationWithRecursion(i,str){
  if(i===0) return 1;
  let lastIndex= str.substring(0,i).lastIndexOf(str[i]);
  let fi1Length=arguments.callee(i-1,str);
  // 之前没有出现过  或者 之前出现过 但是距离当前i 距离大于d
  if(lastIndex === -1 || lastIndex< i-fi1Length) return fi1Length+1;
  // 之前出现过 并且就在f(i-1)对应的子串中
  return  i-lastIndex;
}

// let str='arabcptlacfre';
// let maxLength=findLongestSubStringWithoutDuplicationWithRecursion(str.length-1,str);
// console.log('maxLength',maxLength)


// 2.2 使用非递归的写法
// 时间复杂度 O(n)
function findLongestSubStringWithoutDuplication(str){
  let max =0;
  let lastIndexMap={};
  let lastLength =0;
  for(let i=0;i<str.length;i++){
    let currentLength;
    if(lastIndexMap[str[i]] === undefined ||lastIndexMap[str[i]]< i-lastLength ){
      currentLength=lastLength +1;
    }else {
      currentLength= i-lastIndexMap[str[i]];
    }
    if(max<currentLength){
      max=currentLength;
    }
    lastLength = currentLength;
    lastIndexMap[str[i]]=i;
  }
}

let str='arabcptlacfre';
let maxLength=findLongestSubStringWithoutDuplicationWithRecursion(str.length-1,str);
console.log('非递归maxLength',maxLength);