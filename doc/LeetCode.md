## 1. 两数之和

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

### 解题思路：查找表

1.新建一个查找表map，记录每次target和当前遍历项之差和索引
2.判断map中是否存在当前nums[i]，没有则记录，有则返回当前值索引和查找值的索引
3.循环第2步

### 代码实现

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

## 2. 两数相加

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

### 解题思路：标记法

1.先设立一个进位变量count，用于判断下一次相加之和是否需要进位
2.同时遍历2个链表当前节点值之和为sum
3.判断sum是否超过10，如果超过则设置 sum自减10，同时count变量为1
4.产生新节点后count赋值sum，count归0

### 代码实现

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

## 3. 无重复字符的最长子串

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

### 解题思路:滑动窗口 len[l,r]

1.设置一个map标识每个字符最新出现的位置
2.循环判断每个位置的字符是否已记录在map中，若存在，则更新当前记录最长子串开始位置l，如下图循环第二次出现的b时,取当前l值与字符b标识值下一个位置的最大值，l变为3
0003-01.png 如下图循环第二次出现的a值时，由于当前l值比已标识a值下一个位置索引大，l保持不变
0003-02.png 3.r-l获取目前不重复子串长度，更新size值
4.重复第2、3步

### 代码实现

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

## 4. 寻找两个有序数组的中位数
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

### 解题思路：二分法

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

1.如果len(left) = len(right)
2.根据1和中位数性质可以得出max(left) <= min(right)

那么现在把A、B并集划分为长度相等的两部分，要确保上述两个条件，只需要做到以下保证：

i+j = m-i+n-j，如果n>=m,只需保证0<=i<=m且j=(m+n+1)/2 - i(下面会解释为何不是j=(m+n)/2 - i)
A[i-1] <= B[j] && B[j-1] <= A[i]
首先为何n>=m？因为根据j=(m+n+1)/2 - i，m如果大于n且i有可能等于m的情况下j会变为负数，因此要保证n>=m

所以，在先不考虑边界条件的情况下证明了A[i-1] <= B[j] && B[j-1] <= A[i]就等于找到了完美的i就可以找到对应的中位数

因此可以根据二分法开始寻找：

1.假设iMin = 0,iMax = m, i = (iMin+iMax)/2, j = (m+n+1)/2 - i
2.根据len(left)=len(right),循环中会碰到三情况

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

### 代码实现

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

## 5. 最长回文子串
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

### 示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

### 示例 2：

输入: "cbbd"
输出: "bb"
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/

### 解题思路1：中心扩散法
首先要了解什么是回文串，通俗的话讲就是对称字符串，比如aba为回文串，abba也是回文串，因为它们在反转后仍然相等，即

str === str.reverse()

满足上诉条件就是回文串，而回文串又分为两种情况
0005-01.png
如上图，当长度为奇数的时候中心为a，为偶数的时候中心是a和a的边界，因此在计算的时候就需要同时考虑两种情况
首先定义start和maxLen，start用于记录最长回文串起点，maxLen用于记录最大长度 每次循环去执行一个函数，函数同时执行两次，传入中心点为i和i，i和i+1
0005-02.png
如上图，以长度为奇数为例子，传入的i和i分别当作l和r，当s[l]===s[r]时，l移动至前一位，r移动至后一位，如下图 0005-03.png
继续比较s[l]和s[r]，相等则继续移动,如下图 0005-04.png
继续比较,s[l]!==s[r]，退出循环
然后与maxLen与r-l-1比较，如果后者更大则更新maxLen，同时更新start为l+1

### 解题思路2：Manacher算法
Manacher算法简介

[Manacher(1975)] 发现了一种线性时间算法，可以在列出给定字符串中从字符串头部开始的所有回文。并且，Apostolico, Breslauer & Galil (1995) 发现，同样的算法也可以在任意位置查找全部最大回文子串，并且时间复杂度是线性的。因此，他们提供了一种时间复杂度为线性的最长回文子串解法。替代性的线性时间解决 Jeuring (1994), Gusfield (1997)提供的，基于后缀树(suffix trees)。也存在已知的高效并行算法。

Manacher(又称"马拉车")算法对比中心扩散法来看更可以认为是一种结合kmp的优化版，对比中心扩散法时间复杂度是O(n^2),马拉车算法时间复杂度为O(n)

##### 第1步：添加分隔符
中心扩散法需要同时计算奇数长度和偶数长度的中心，马拉车算法开始计算前在字符串中插入分隔符#,就可以把奇数长度和偶数长度的字符串全部整合为一种情况，如下:
比如：

奇数长度：bbbabbc =====> #b#b#ba#b#b#c#
偶数长度：cbbabb =====> #c#b#b#a#b#b#
为什么需要加分隔符呢，简单做个计算：假如字符串长度是len,在每个字符前添加一个分隔符长度就会变为2*len，在字符串最后再加一个分隔符，长度就变为2*len+1，这样就确保字符串长度始终为奇数，可以不考虑之前偶数长度情况,往后计算会更加方便

##### 第2步：建立p数组，得到任意字符串回文半径长度
建立p数组的意义在于得到任意字符串回文半径长度，因为每一个字符串本身都个可以看作是一个回文字符，而较前位置的回文字符半径会被较后位置的回文字符复用(由于回文字符性质，前半部分存在的回文字符在后半部分同样存在)，因此复用半径可以直接减少while循环次数，直接降低时间复杂度

以cbbabb为例，先画出下面的表格
0005-05.png
首先定义如何计算回文半径：

从字符串开始计算，以当前扩散点为中心，最小半径为1，然后同时往左右进行中心扩散，直至不能扩散为止
首先计算str[0]，初始半径为1，然后进行中心扩散，结果都到了边界，因此str[0]半径为1
0005-06.png
计算str[1]，同样初始化半径后中心扩散，str[0]=str[2]，半径加1，继续扩散到达边界
0005-07.png
计算str[2]，左右扩散后到达边界
0005-08.png
计算str[3]，左右扩散匹配，半径加1，继续扩散到达边界
0005-09.png
计算str[4]，左右扩散匹配，半径加1，继续扩散匹配，加1，继续扩散到达边界 0005-10.png
最终计算完的p数组:
0005-11.png
p-1数组
0005-12.png
为什么还要p-1数组呢，这里简单分析下:
1.已知长度为n的回文串添加分隔符后长度为2n+1
2.假设上面计算的中心半径为p，那么容易得出2p-1 = 2n+1
3.通过2可以算出p = n+1 ===> p-1 = n,因此得到p-1数组即为回文串长度数组

##### 第3步：如何在代码中计算p数组
在第2步里介绍了马拉车算法核心在于复用回文串长度，在了解如何复用前先看下图:
0005-13.png
从上图容易获得三个关键信息:
1.i和j是关于cid中心对称的，容易得出j=2*cid - id的性质
2.假设mr为最长回文串的最右边界，那么容易得出cid+p[cid]-1 = mR
3.假设以i为中心的字符串也是回文串，那么根据上图可以得出i+p[i]-1<=mR
通过以上三个性质，先去计算最简单的一种情况:
1.假如i不超过mR，那么就可以考虑复用原则:

假如以j为中心的回文串长度不超过cId的半径,那么p[i]=p[2*cid-j]是成立的
假如以j为中心的回文串长度超过cId半径，大概情况如下图:
0005-14.png
从上图可以看出j的半径明显要比i要大，因此p[i]=p[2*cid-j]明显不成立，但是由于j半径过长，由于对称原则i的右边界可以到达mR，也就是说可以得出p[i]=mR-i+1
2.假如i超过mR，这就简单了，赋值当前半径为1，使用中心扩散法去左右扩散匹配
3.根据以上两点，总结出以下代码:
p[i] = i < mostR ? Math.min(p[2 * cId - i], mostR - i + 1) : 1;
4.当计算完p[i]后就要判断当前i的半径是否超过mR，超过则更新mR和cid

### 代码实现：中心扩散法

```js

const longestPalindrome = (s) => {
    if (s.length === 1) return s;
    let start = 0, maxLen = 0;
    const extendPalindrome = (s, l, r) => {
        while (l >= 0 && r < s.length && s.charAt(l) === s.charAt(r)) {
            l--;
            r++;
        }
        if (maxLen < r - l - 1) {
            start = l + 1;
            maxLen = r - l - 1;
        }
    };
    for (let i = 0; i < s.length - 1; i++) {
        extendPalindrome(s, i, i);
        extendPalindrome(s, i, i + 1)
    }
    return s.substring(start, start + maxLen)
};
#代码实现：Manacher算法
const longestPalindrome = (s) => {
    let str = '';
    for (let i = 0; i < s.length; i++) {
        str += `#${s.charAt(i)}`;
    }
    str += '#';

    let slen = str.length,
        p = Array(slen),
        mostR = 0,
        cId = 0,
        palLen = 1,
        palStr = s.substring(0, 1);

    for (let i = 0; i < slen; i++) {
        p[i] = i < mostR ? Math.min(p[2 * cId - i], mostR - i + 1) : 1;

        while (i - p[i] >= 0 && i + p[i] < slen && str.charAt(i - p[i]) === str.charAt(i + p[i])) {
            p[i]++
        }

        if (i + p[i] - 1 > mostR) {
            mostR = i + p[i] - 1;
            cId = i
        }

        if (p[i] - 1 > palLen) {
            palLen = p[i] - 1;
            palStr = str.substring(i - p[i] + 1, i + p[i]).replace(/#/g, '')
        }
    }

    return palStr
};

```

## 6. Z字形变换

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

### 解题思路1:指针法

1.首先设置三个变量：

rows:用于存放每一行的字符串的数组
goingDown:用于判断字符串遍历方向是往上还是往下
curRow:当前遍历字符串应当存放的行数
2.从左至右遍历字符串,rows[curRow]=str,如下图： 0006-01.png 从P开始遍历，存储到第一行字符串，而且当前行数为0，证明当前位置在顶部，那么遍历方向一定是是向下的，所以设置goingDown为true,curRow加1 0006-02.png 如上图，当遍历到第二个P时，已经到了底部，那么意味下一次遍历就是反方向的，那么goingDown为false，curRow就要相应减1让下一个遍历的字符存储到上一行

### 代码实现

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

## 7.整数反转

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

### 解题思路

数字反转可以使用栈推出的思路去解决，以数字123为例：

123%10会得到最后一位数字3，推出3后需要要继续推出2，那么可以用123/10把3删除掉，继续用12%10把2推出来，推出后原先的3要先乘以10再与2相加，即3*10+2=32，以此类推就可以把数字反转过来
在推出过程中也需要判断推出组合的新数字有没有溢出，如果溢出则直接返回0，没有则继续上一步循环

### 代码实现

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
