### 1. 题目：两数之和
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum

##### 解题思路：查找表

= 1.新建一个查找表map，记录每次target和当前遍历项之差和索引
- 2.判断map中是否存在当前nums[i]，没有则记录，有则返回当前值索引和查找值的索引
- 3.循环第2步

##### 代码实现

```js

const twoSum = function (nums, target) {
    // 解题思路：从无序数组中找到两个值，查找表方法记录，使两个值之和等于target
    /**
     * 查找表
     * @type {Map}
     */
    let m = new Map(),
        len = nums.length;
    for (let i = 0; i < len; i++) {
        if (m.has(nums[i])) {
            return [m.get(nums[i]), i]
        }
        m.set((target - nums[i]), i)
    }
};

```
