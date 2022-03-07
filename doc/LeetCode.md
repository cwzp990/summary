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

### 6. 题目：整数反转
给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例1：

输入: 123
输出: 321
示例 2：

输入: -123
输出: -321
示例 3：

输入: 120
输出: 21
注意: 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231, 231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-integer/

##### 解题思路
数字反转可以使用栈推出的思路去解决，以数字123为例：

123%10会得到最后一位数字3，推出3后需要要继续推出2，那么可以用123/10把3删除掉，继续用12%10把2推出来，推出后原先的3要先乘以10再与2相加，即3 * 10+2=32，以此类推就可以把数字反转过来
在推出过程中也需要判断推出组合的新数字有没有溢出，如果溢出则直接返回0，没有则继续上一步循环

##### 代码实现

```js

const reverse = (x) => {
    let res = 0,
        min = Math.pow(-2, 31),
        max = Math.pow(2, 31) - 1;
    while (x) {
        res = res * 10 + x % 10;
        x = parseInt(x / 10);
        if(res < min || res > max) return 0
    }

    return res
};

```

### 7. 题目：字符串转换整数 (atoi)

请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，qing返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

示例1：

输入: "42"
输出: 42
示例 2：

输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
示例 3：

输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字
示例 4：

输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
示例 5：

输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。
     因此返回 INT_MIN (−231) 。
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/string-to-integer-atoi/

#### 解题思路

- 1.首先设置变量:

i:当前遍历位置
isNegative: 判断转化结果是否为负数

- 2.先从判断字符串前面有没有空格开始，如果有则一直遍历下去，i一直加1

- 3.当检测到有加减符号后，如果是减号，isNegative为true

- 4.利用字符串编码的性质,比如字符串0的编码为48，1的编码为49，2的编码为50，以此类推，那么可以得出0-9的编码是48-57，因此可以根据str.charCodeAt(i)-48得出差值计算当前字符是否可以转换为数字，如下:

假设str='13a12',i从0开始遍历，str.charCodeAt(i)-48=1，0<1<9,当前字符符合要求，i加1，结果值res*10后与当前字符相加
i=1，str.charCodeAt(i)-48=3，0<3<49，符合要求，同上操作
i=2时，str.charCodeAt(i)-48=49，49>9，不符合要求，转换停止

- 5.通过isNegative判断是否需要给res转化为负数

##### 代码实现

```js

let myAtoi = (str) => {
    let i = 0,
        res = 0,
        isNegative = false,
        code;

    while (str[i] === ' ') {
        i++
    }


    if (str[i] === '+' || str[i] === '-') {
        isNegative = str[i] === '-';
        i++
    }

    while (i < str.length) {
        code = str.charCodeAt(i) - 48;
        if (code < 0 || code > 9) break;

        res *= 10;
        res += code;
        i++
    }
    if (isNegative) {
        res = -res
    }
    return Math.max(Math.min(res, 2147483647), -2147483648)
};

```

### 8. 题目：回文数
判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例1：

输入: 121
输出: true
示例 2：

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
示例 3：

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
进阶:

你能不将整数转为字符串来解决这个问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/palindrome-number/

#### 解题思路：
- 1.先判断x传进来的两种情况:

是否为负数
数字最后一位是否为0(除了0本身) 以上两种情况反转后肯定不等于原来的数，因此要先过滤掉

- 2.根据题目要求要返回与输入结果是否相等，因此与第七题反转数字的思路是一样的，但是有一点小小的区别，可以只计算一半就返回判断结果，因为根据回文对称原则,前半部分与后半部分一定是相等的,比如:
x=12321,reverse=0,使用栈推出的方法，推出倒数第一个和第二个数字后reverse为12，x为123，而在x长度为奇数的情况下中间的数字是可以忽略掉的，因此可以设定一个当x>reverse的循环条件，当reverse变为123后退出循环
判断是否相等的时候，根据上文提到的奇数情况下3是可以忽略掉的，因此可以用reverse/10把3删除掉后与x进行比较
需要注意的是在反转的过程中不需要判断是否溢出，假设传入数字为123456789，完全反转后的数字为987654321,假设这个数字是溢出的，那么反转到一半的时候reverse=98765，只反转了一半的长度，也不会存在溢出的问题，即使给出的x完整反转后是存在溢出，由于题目没有明确说明这种情况下这里暂不对这种情况做讨论

#### 代码实现

```js

let isPalindrome = function (x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let reverse = 0;
    while (x > reverse) {
        reverse = reverse * 10 + x % 10;
        x = Math.floor(x / 10);
    }

    return x === reverse || x === Math.floor(reverse / 10)
};

```

### 9. 题目：正则表达式匹配

给你一个字符串s和一个字符串类型匹配模式p，请你来实现一个支持'.'和'*'的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串s的，而不是部分字符串 说明:

s 可能为空，且只包含从 a-z 的小写字母。
p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例1：

输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
示例 2：

输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
示例 3：

输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）
示例 4：

输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
示例 5：

输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/regular-expression-matching/

##### 解题思路:动态规划

首先解题要先理解正则表达式具体匹配规则,先来做个最简单的假设:

假设s=ab,p=a*b*,那么毫无疑问s.match(p)是成立的

根据上面的例子,p变成a*b*c,那么这就是不成立的，因为s并没有c，如果p再加一个*变成a*b*c*，那么匹配又会变成立，因为c这个时候可以匹配为0个

那么当匹配到*号的时候具体到代码上逻辑是这样的:

if(p.charAt(i) === '*'){
  dp[i+1] = dp[i-1]
}
以上的逻辑思路就是当匹配到a*b*c*中时，判断最后一个*是否匹配成立只需要看第2个*,即a*b*是否匹配，如果匹配那么a*b*c*也是成立的,假如s换成是ad，那么走到a*b的时候就已经不匹配了,经过状态转移a*b*c*也不会匹配，所以使用 动态规划 就再合适不过

##### 第一步：建立二维数组

假设s=abbcddd,p=a*b*.dd*,因此先建立一张对应二维数组的表:
0010-01.png 为何要在p前面加一个空字符串(只是在表格中加)，原因也很简单，假设当s='',p=a*时匹配是成立的，那么根据上面的逻辑dp[0][j+1]=dp[0][j-1],那么就需要一个空值为true才能确保转移到a*后仍然为true
然后先建立一种简单的匹配情况，字符可以先把s假设为空字符串，p不变，那么可以s匹配p的结果如下(假设0为false,1为true):
0010-02.png 如上图，当p[j]='.'的时候可以当成是任意字符串但不能为空，因此匹配也为false，结合上述逻辑，一开始先匹配第一个空字符的逻辑可以总结为:

    dp[0][0] = true;
    for (let i = 1; i < p.length; i++) {
        if (p.charAt(i) === "*") {
            dp[0][i + 1] = dp[0][i - 1]
        }
    }
这个时候匹配完的dp[0]意义就是后续dp[i][j]进行状态转移的判断依据

##### 第二步: 匹配状态转移

在dp[0]全部赋值后开始对字符串s和模式字符串p进行逐一匹配，那么匹配过程一共会碰到三种情况:

p[j]为普通字符时:
如果s[i]===p[j],那么通过dp[i+1][j+1]=dp[i][j]判断，例子如下图：
0010-03.png

p[j]为.时:
可以把p[j]看成任意但不为空的字符，也是通过dp[i+1][j+1]=dp[i][j]判断，例子如下图：
0010-04.png

p[j]为*时:
1.如果p[j-1]!==s[i]&&p[j-1]!=='.'时，和上面的dp[0][j+1]=dp[0][j-1]的逻辑一样，把前一个*的状态值转移过来，如下图:
0010-05.png 当i=0,j=3时,s[0]!==p[2]，因此dp[i+1][j+1]=dp[i+1][j-1]=1

2.当p[j-1]==s[i]时，对*可以匹配成功的情况可以分为三种，假设p[j-1]=b，出现的个数为n:

n=0时，复用上面的逻辑，即dp[i+1][j+1]=dp[i+1][j-1]
n=1时，dp[i+1][j+1]只需要等于dp[i+1][j]的值即可，如下图： 0010-06.png
n>=2时，这个时候dp[i+1][j]和dp[i+1][j-1]都有可能为false，如下图: 0010-07.png 那么在出现多个b后dp[i+1][j+1]可以根据dp[i][j+1]判断
综上所述，当p.charAt(j) === '*'时，具体逻辑可以归纳为:
  if (p.charAt(j - 1) !== s.charAt(i) && p.charAt(j - 1) !== '.') {
      dp[i + 1][j + 1] = dp[i + 1][j - 1]
  } else {
      dp[i + 1][j + 1] = (dp[i + 1][j] || dp[i][j + 1] || dp[i + 1][j - 1])
  }
匹配完成后返回dp[s.length][p.length]就是最终结果。

##### 代码实现

```js

let isMatch = function (s, p) {
    let dp = Array(s.length + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = Array(p.length + 1).fill(false)
    }
    dp[0][0] = true;
    for (let i = 1; i < p.length; i++) {
        if (p.charAt(i) === "*") {
            dp[0][i + 1] = dp[0][i - 1]
        }
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < p.length; j++) {
            if (p.charAt(j) === '.') {
                dp[i + 1][j + 1] = dp[i][j]
            }

            if (p.charAt(j) === s.charAt(i)) {
                dp[i + 1][j + 1] = dp[i][j]
            }

            if (p.charAt(j) === '*') {
                if (p.charAt(j - 1) !== s.charAt(i) && p.charAt(j - 1) !== '.') {
                    dp[i + 1][j + 1] = dp[i + 1][j - 1]
                } else {
                    dp[i + 1][j + 1] = (dp[i + 1][j] || dp[i][j + 1] || dp[i + 1][j - 1])
                }
            }
        }
    }
    return dp[s.length][p.length]
};

```
