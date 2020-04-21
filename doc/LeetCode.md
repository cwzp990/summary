**1. 两数之和**

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：

```

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum

```

#解题思路：查找表
1.新建一个查找表map，记录每次target和当前遍历项之差和索引
2.判断map中是否存在当前nums[i]，没有则记录，有则返回当前值索引和查找值的索引
3.循环第2步

#代码实现

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

**2. 两数相加**

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例:

```js

输入: (2 -> 4 -> 3) + (5 -> 6 -> 4)
输出: 7 -> 0 -> 8
解释: 342 + 465 = 807.
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers/

```

#解题思路：标记法
1.先设立一个进位变量count，用于判断下一次相加之和是否需要进位
2.同时遍历2个链表当前节点值之和为sum
3.判断sum是否超过10，如果超过则设置 sum自减10，同时count变量为1
4.产生新节点后count赋值sum，count归0

```js

#代码实现
const addTwoNumbers = function (l1, l2) {
    let list = new ListNode(0),
        curr = list,
        count = 0,
        sum = 0;

    while (l1 || l2 || sum) {
        if (l1) {
            sum += l1.val;
            l1 = l1.next
        }

        if (l2) {
            sum += l2.val;
            l2 = l2.next
        }

        if (sum >= 10) {
            sum -= 10;
            count = 1
        }

        curr.next = new ListNode(sum);
        curr = curr.next;
        sum = count;
        count = 0;
    }

    return list.next
};

```
