/**
 * 二分查找
 * 1.取排列好的数组(从大到小, 从小到大)
 * 2.匹配值和当前数组中间值进行比对
 * 3.<从小到大>:如果匹配值大于中间值,就对后半数据进行类似操作,如果匹配值小于中间值,就对前半数据进行类型操作
 * 4.<从大到小>:如果匹配值大于中间值,就对前半数据进行类似操作,如果匹配值小于中间值,就对后半数据进行类型操作
 */
class BinarySearch {
  constructor(orgArray, isSort) {
    // 原始数据
    this.orgArray = orgArray;
    // 原始数据是否排序,没有排序进行排序操作
    !isSort && this.sort();
  }
  sort() {
    // 重小到大排序
    this.orgArray = this.orgArray.sort((a, b) => a - b);
  }
  /**
   * 查询数据
   * @param {string} target 查询数据id
   * @return object string any
   */
  find(target) {
    let left = 0,
      right = this.orgArray.length - 1;
    while (left <= right) {
      let centerIndex = Math.floor((left + right) / 2);
      let arr = this.orgArray[centerIndex];

      if (arr.id > target.id) {
        right = centerIndex - 1;
      } else if (arr.id < target.id) {
        left = centerIndex + 1;
      }
      return arr;
    }
    return null;
  }
}
