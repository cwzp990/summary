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

### 2. 题目：两数相加
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例:

输入: (2 -> 4 -> 3) + (5 -> 6 -> 4)
输出: 7 -> 0 -> 8
解释: 342 + 465 = 807.
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers/

##### 解题思路：标记法

- 1.先设立一个进位变量count，用于判断下一次相加之和是否需要进位
- 2.同时遍历2个链表当前节点值之和为sum
- 3.判断sum是否超过10，如果超过则设置 sum自减10，同时count变量为1
- 4.产生新节点后count赋值sum，count归0

#### 代码实现

```js

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

### 3.题目：无重复字符的最长子串
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"

输出: 3

解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:

输入: "bbbbb"

输出: 1

解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:

输入: "pwwkew"

输出: 3

解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。

请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/

#### 解题思路:滑动窗口 len[l,r]

- 1.设置一个map标识每个字符最新出现的位置
- 2.循环判断每个位置的字符是否已记录在map中，若存在，则更新当前记录最长子串开始位置l，如下图循环第二次出现的b时,取当前l值与字符b标识值下一个位置的最大值，l变为3
0003-01.png 如下图循环第二次出现的a值时，由于当前l值比已标识a值下一个位置索引大，l保持不变
0003-02.png
- 3.r-l获取目前不重复子串长度，更新size值
- 4.重复第2、3步

##### 代码实现

```js

const lengthOfLongestSubstring = (s) => {
    if (!s) return 0;
    let map = new Map(),
        l = 0,
        r = 0,
        len = s.length,
        size = 0;
    while (r < len) {
        if (map.has(s[r])) {
            l = Math.max(l, map.get(s[r]) + 1);
        }
        map.set(s[r], r);
        r++;
        size = Math.max(size, r - l);

    }
    return size
};

```

### 4. 题目：寻找两个有序数组的中位数
给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例1：

nums1 = [1, 3]
nums2 = [2]

则中位数是 2.0

示例2：

nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/median-of-two-sorted-arrays/

##### 解题思路：二分法
首先在做这题之前要了解什么是中位数，中位数作用：

中位数（又称中值，英语：Median），统计学中的专有名词，代表一个样本、种群或概率分布中的一个数值，其可将数值集合划分为相等的上下两部分。

简而言之中位数把一个数集划分为长度相等两部分，而这个数要比上部分数值都要大，比下部分数值都要小

回过头来看题目要求，要求算法时间复杂度为O(log(m + n))，因此可以用二分法性质解决。

首先假设把A数组划分成任意(注意是任意，不是长度相等)两部分，A长度为m

                left                 |                 right
  A[0],A[1],A[2],.....A[i-2],A[i-1]  |  A[i],A[i+1],A[i+2]......A[m-1]
可以得出：lenA(left)=i,lenA(right)=m-i,同样把B数组划分任意两部分，B长度为n

                left                 |                 right
  B[0],B[1],B[2],.....B[j-2],B[j-1]  |  B[j],B[j+1],B[j+2]......B[n-1]
同理lenB(left)=j,lenB(right)=n-j,然后把A、B放进一个合集中

                left                 |                 right
  A[0],A[1],A[2],.....A[i-2],A[i-1]  |  A[i],A[i+1],A[i+2]......A[m-1]
  B[0],B[1],B[2],.....B[j-2],B[j-1]  |  B[j],B[j+1],B[j+2]......B[n-1]
我们可以先做一个假设:

- 1.如果len(left) = len(right)
- 2.根据1和中位数性质可以得出max(left) <= min(right)

那么现在把A、B并集划分为长度相等的两部分，要确保上述两个条件，只需要做到以下保证：

i+j = m-i+n-j，如果n>=m,只需保证0<=i<=m且j=(m+n+1)/2 - i(下面会解释为何不是j=(m+n)/2 - i)
A[i-1] <= B[j] && B[j-1] <= A[i]
首先为何n>=m？因为根据j=(m+n+1)/2 - i，m如果大于n且i有可能等于m的情况下j会变为负数，因此要保证n>=m

所以，在先不考虑边界条件的情况下证明了A[i-1] <= B[j] && B[j-1] <= A[i]就等于找到了完美的i就可以找到对应的中位数

因此可以根据二分法开始寻找：

- 1.假设iMin = 0,iMax = m, i = (iMin+iMax)/2, j = (m+n+1)/2 - i
- 2.根据len(left)=len(right),循环中会碰到三情况

i < iMax && B[j-1]>A[i] 证明i太小需要增大，当i增大时根据(m+n+1)/2 - ij就会减小，当i增j减时B[j-1]<=A[i]才有可能成立，因此重新定义区间，根据i = (iMin+iMax)/2，i要增大iMin也要增大,因此iMin=i+1,i=(iMin+iMax)/2进行二分查找

i > iMin && A[i-1]>B[j] 证明i太大需要减小，原理同上

当上述两种情况都不出现时，证明找到了想要的i 这个时候判断m+n长度：
如果为奇数则返回max(A[i-1],B[j-1]),偶数则返回(max(left)+min(right))/2

而奇数为何是返回max(A[i-1],B[j-1])而不是max(A[i],B[i])呢

这就需要回到前面j=(m+n+1)/2 - i，+1操作是m+n为奇数时：

比如m+n=5,那么根据i+j=(m+n+1)/2后i+j(也就是len(left))=3，这个时候中位数就落在了左边

而为什么要让中位数落在左边：

因为根据代码实现，如果把中位数放在右边，那么相当于要返回min(A[i],B[j]),但实际上又存在边界条件，比如A=[],B=[1],这个时候len(right)是不存在的，因此min(A[i],B[j])就不存在，所以要选取len(left)存放中位数

如果碰到i=0||i=m||j=0||j=m边界条件:

假如i=0 || j=0，表示有一个左区间不存在，max(left)直接等于A[i]或B[j]
同理i=m || j=n，表示有一个右区间不存在，min(right)直接等于A[i-1]或B[j-1]

##### 代码实现

```js

const findMedianSortedArrays = (A, B) => {
    let m = A.length,
        n = B.length;

    if (m > n) {
        [A, B] = [B, A]
        let temp = m;
        m = n;
        n = temp;
    }

    let iMin = 0, iMax = m, half = (m + n + 1) >> 1, i, j;

    while (iMin <= iMax) {
        i = (iMin + iMax) >> 1;
        j = half - i;
        if (i < iMax && B[j - 1] > A[i]) {
            iMin = i + 1
        } else if (i > iMin && B[j] < A[i - 1]) {
            iMax = i - 1
        } else {
            let maxLeft = 0;
            if (i === 0) {
                maxLeft = B[j - 1]
            } else if (j === 0) {
                maxLeft = A[i - 1]
            } else {
                maxLeft = Math.max(A[i - 1], B[j - 1])
            }

            if ((m + n) % 2 === 1) return maxLeft;

            let minRight = 0;
            if (i === m) {
                minRight = B[j]
            } else if (j === n) {
                minRight = A[i]
            } else {
                minRight = Math.min(A[i], B[j])
            }

            return (maxLeft + minRight) / 2
        }
    }
};

```

### 5. 题目：Z 字形变换

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L C I R
E T O E S I I G
E D H N

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);

示例1：

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
示例2：

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"<br>
解释:
  L     D     R
  E   O E   I I
  E C   I H   N
  T     S     G
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/zigzag-conversion/

#### 解题思路1:指针法

- 1.首先设置三个变量：
rows:用于存放每一行的字符串的数组
goingDown:用于判断字符串遍历方向是往上还是往下
curRow:当前遍历字符串应当存放的行数

- 2.从左至右遍历字符串,rows[curRow]=str,如下图： 0006-01.png 从P开始遍历，存储到第一行字符串，而且当前行数为0，证明当前位置在顶部，那么遍历方向一定是是向下的，所以设置goingDown为true,curRow加1 0006-02.png 如上图，当遍历到第二个P时，已经到了底部，那么意味下一次遍历就是反方向的，那么goingDown为false，curRow就要相应减1让下一个遍历的字符存储到上一行

#### 代码实现

```js

let convert = (s, nRows) => {
    if (nRows <= 1) return s;
    let rows = Array(Math.min(nRows, s.length)).fill(''),
        goingDown = false,
        curRow = 0,
        res = '';
    for (let i = 0, len = s.length; i < len; i++) {
        rows[curRow] += s.charAt(i);
        if (curRow === 0 || curRow === nRows - 1) goingDown = !goingDown;
        curRow += goingDown ? 1 : -1
    }
    for (let str of rows) {
        res += str
    }

    return res
};

```
