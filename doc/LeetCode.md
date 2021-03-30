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

## 8.字符串转换整数 (atoi)

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

### 解题思路

1.首先设置变量:

i:当前遍历位置
isNegative: 判断转化结果是否为负数
2.先从判断字符串前面有没有空格开始，如果有则一直遍历下去，i一直加1
3.当检测到有加减符号后，如果是减号，isNegative为true
4.利用字符串编码的性质,比如字符串0的编码为48，1的编码为49，2的编码为50，以此类推，那么可以得出0-9的编码是48-57，因此可以根据str.charCodeAt(i)-48得出差值计算当前字符是否可以转换为数字，如下:

假设str='13a12',i从0开始遍历，str.charCodeAt(i)-48=1，0<1<9,当前字符符合要求，i加1，结果值res*10后与当前字符相加
i=1，str.charCodeAt(i)-48=3，0<3<49，符合要求，同上操作
i=2时，str.charCodeAt(i)-48=49，49>9，不符合要求，转换停止
5.通过isNegative判断是否需要给res转化为负数

### 代码实现

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

## 9.回文数

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

### 解题思路：

1.先判断x传进来的两种情况:

是否为负数
数字最后一位是否为0(除了0本身) 以上两种情况反转后肯定不等于原来的数，因此要先过滤掉
2.根据题目要求要返回与输入结果是否相等，因此与第七题反转数字的思路是一样的，但是有一点小小的区别，可以只计算一半就返回判断结果，因为根据回文对称原则,前半部分与后半部分一定是相等的,比如:

x=12321,reverse=0,使用栈推出的方法，推出倒数第一个和第二个数字后reverse为12，x为123，而在x长度为奇数的情况下中间的数字是可以忽略掉的，因此可以设定一个当x>reverse的循环条件，当reverse变为123后退出循环
判断是否相等的时候，根据上文提到的奇数情况下3是可以忽略掉的，因此可以用reverse/10把3删除掉后与x进行比较
需要注意的是在反转的过程中不需要判断是否溢出，假设传入数字为123456789，完全反转后的数字为987654321,假设这个数字是溢出的，那么反转到一半的时候reverse=98765，只反转了一半的长度，也不会存在溢出的问题，即使给出的x完整反转后是存在溢出，由于题目没有明确说明这种情况下这里暂不对这种情况做讨论

### 代码实现

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

## 10. 正则表达式匹配

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

### 解题思路:动态规划

首先解题要先理解正则表达式具体匹配规则,先来做个最简单的假设:

假设s=ab,p=a*b*,那么毫无疑问s.match(p)是成立的

根据上面的例子,p变成a*b*c,那么这就是不成立的，因为s并没有c，如果p再加一个*变成a*b*c*，那么匹配又会变成立，因为c这个时候可以匹配为0个

那么当匹配到*号的时候具体到代码上逻辑是这样的:

if(p.charAt(i) === '*'){
  dp[i+1] = dp[i-1]
}
以上的逻辑思路就是当匹配到a*b*c*中时，判断最后一个*是否匹配成立只需要看第2个*,即a*b*是否匹配，如果匹配那么a*b*c*也是成立的,假如s换成是ad，那么走到a*b的时候就已经不匹配了,经过状态转移a*b*c*也不会匹配，所以使用 动态规划 就再合适不过

### 第一步：建立二维数组

假设s=abbcddd,p=a*b*.dd*,因此先建立一张对应二维数组的表:
0010-01.png 为何要在p前面加一个空字符串(只是在表格中加)，原因也很简单，假设当s='',p=a*时匹配是成立的，那么根据上面的逻辑dp[0][j+1]=dp[0][j-1],那么就需要一个空值为true才能确保转移到a*后仍然为true
然后先建立一种简单的匹配情况，字符可以先把s假设为空字符串，p不变，那么可以s匹配p的结果如下(假设0为false,1为true):
0010-02.png 如上图，当p[j]='.'的时候可以当成是任意字符串但不能为空，因此匹配也为false，结合上述逻辑，一开始先匹配第一个空字符的逻辑可以总结为:

```js

    dp[0][0] = true;
    for (let i = 1; i < p.length; i++) {
        if (p.charAt(i) === "*") {
            dp[0][i + 1] = dp[0][i - 1]
        }
    }
    
 ```
 
这个时候匹配完的dp[0]意义就是后续dp[i][j]进行状态转移的判断依据

### 第二步: 匹配状态转移

在dp[0]全部赋值后开始对字符串s和模式字符串p进行逐一匹配，那么匹配过程一共会碰到三种情况:

p[j]为普通字符时:
如果s[i]===p[j],那么通过dp[i+1][j+1]=dp[i][j]判断，例子如下图：
0010-03.png

p[j]为.时:
可以把p[j]看成任意但不为空的字符，也是通过dp[i+1][j+1]=dp[i][j]判断，例子如下图：
0010-04.png

p[j]为*时:

+ 1.如果p[j-1]!==s[i]&&p[j-1]!=='.'时，和上面的dp[0][j+1]=dp[0][j-1]的逻辑一样，把前一个*的状态值转移过来，如下图:
0010-05.png 当i=0,j=3时,s[0]!==p[2]，因此dp[i+1][j+1]=dp[i+1][j-1]=1

+ 2.当p[j-1]==s[i]时，对*可以匹配成功的情况可以分为三种，假设p[j-1]=b，出现的个数为n:

n=0时，复用上面的逻辑，即dp[i+1][j+1]=dp[i+1][j-1]
n=1时，dp[i+1][j+1]只需要等于dp[i+1][j]的值即可，如下图： 0010-06.png
n>=2时，这个时候dp[i+1][j]和dp[i+1][j-1]都有可能为false，如下图: 0010-07.png 那么在出现多个b后dp[i+1][j+1]可以根据dp[i][j+1]判断
综上所述，当p.charAt(j) === '*'时，具体逻辑可以归纳为:

```js

  if (p.charAt(j - 1) !== s.charAt(i) && p.charAt(j - 1) !== '.') {
      dp[i + 1][j + 1] = dp[i + 1][j - 1]
  } else {
      dp[i + 1][j + 1] = (dp[i + 1][j] || dp[i][j + 1] || dp[i + 1][j - 1])
  }
  
```

匹配完成后返回dp[s.length][p.length]就是最终结果。

### 代码实现

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

### 11. 盛最多水的容器

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。 title 图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例1：

输入: [1,8,6,2,5,4,8,3,7]
输出: 49
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/container-with-most-water/

#### 解题思路：双指针法
首先假设高为h，两线距离为len，我们知道求体积v的公式是h*len，那么根据公式可以知道如果要求出最大体积那么len应该是尽可能的长，但是由于受到h的限制只能取相对短一端来计算
先初始设置左右两线位置为l=0和r=height.length-1如下图: 0011-01.png 如上图，先从h[l]和h[r]取最短的作为h，那么v=h[l]*(r-l)=8,在计算完后l往右移动，为什么是l往右移动而不是r往左移动呢呢，因为已知计算v时h应取最短一侧，那么当前长度已为最远情况下h不变就不可能超过原来的值 0011-05.png 如上图，假设r往左移动，那么按上面的公式计算出的结果v=7,所以要取得最大体积只能把短的一边舍弃寻找更高的值 0011-02.png 如上图l往左移动后v=h[r]*(r-l)=49，那么这个值是大于之前计算的v

#代码实现

```js

let maxArea = function (height) {
    let h1 = 0,
        h2 = 0,
        w = 0,
        v = 0,
        maxv = 0,
        l = 0,
        r = height.length - 1;
    while (r - l > 0) {
        h1 = height[l];
        h2 = height[r];
        if (h1 > h2) {
            v = h2 * (r - l)
            r--
        } else {
            v = h1 * (r - l)
            l++
        }
        maxv = Math.max(maxv, v)
    }
    return maxv
};

```

### 12. 整数转罗马数字

罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。 给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。
示例1：

输入: 3
输出: "III"
示例 2：

输入: 4
输出: "IV"
示例 3：

输入: 9
输出: "IX"
示例 4：

输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
示例 5：

输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/integer-to-roman

#### 解题思路:贪心算法

首先根据题目可以得出是一个数值转换题，特定数字都有对应的转换字符，而且题目要求用最少的字符去转换数字，那么可以使用贪心算法去求解。

为什么使用贪心算法，因为根据罗马数字的规律，以7为例，罗马数字为VII而不是IIIIIII，那么可以看出是先以较大数字去组合，然后再用小的数字组合剩余值，那么这时候用贪心算法就再适合不过。

**第一步：建立对应数组**

根据题目给出的列表可以生成两个数组，一个存放字符一个存放数组，那么如何建立这两个数组呢，除了题目给出的题表以外还需要列出题目另外提到的特殊情况，就拿数组1-10举个例子:
先看2如何组合 0012-01.png 再看3如何组合 0012-02.png 再看4如何组合 0012-03.png 到这里可以看到4并不是IIII，而是IV，根据题目描述看成是5-1，换成字符来理解就是I-V(为何不是V-I而是I-V，个人理解是因为6是V+I，那么减法就只能放左边了)，在计算完4后剩下的5-10也是显而易见的，如下图: 0012-04.png 那么其他数字组合也是大同小异的，根据上面的图可以分别建立一个存放数字的数组values和存放字符的数组strs,两个数组只需要存放常规情况和特殊情况的数字和字符,上图中比如2和3不会存放进去，将会在下面的计算中算出:

  let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  
**第二步：由大到小遍历**

根据上面建立的两个数组进行一次遍历，然后判断num是否大于等于当前values[i]，如果是则自减values[i]，持续while循环，直至不符合条件寻找下一个values[i]，比如说：

num=7,result=''，遍历到5后，符合num>=values[i]条件
result += strs[i]='V',num -= values[i]=2，不符合条件继续寻找下一个values[i]
values[i]=2,符合条件，result = 'VI'，num=1，符合条件，result='VII'，num=0，不符合条件，并且i已到最后一位，退出for循环

代码实现

```js

let intToRoman = function (num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
        result = '';
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            num -= values[i];
            result += strs[i];
        }
    }
    return result;
};

```

### 13.最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例1：

输入: ["flower","flow","flight"]
输出: "fl"
示例2：

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-prefix/

#### 解题思路：水平扫描
对于LCP问题，可以先列一个方程，大概是这样的:

LCP(s1,s2,s3,.....,sn)=LCP(LCP(LCP(s1,s2),s3)....,sn)
这个方程的含义就是先从s1和s2中找到CP(s1,s2)，然后找出来的CP(s1,s2)再和s3的CP(s1,s2,s3)，以此类推到CP(s1,s2,s3,.....sn)就是最后的解

那么问题就回到如何去得出CP(s1,s2)上：

假设s1='flower',s2='flow'，可以不断对s1进行削减，当s1削减到成为flow时CP(s1,s2)的结果就出现了，如下图 0014-01.png
在得出CP(s1,s2)后可以用一个pre变量缓存起来，继续求下一个与s3的CP(CP(pre,s3))，如下图 0014-02.png
如果pre为空字符串的情况下证明没有CP，那么可以直接返回结果

#代码实现

```

let longestCommonPrefix = function (strs) {
    if (strs === null || strs.length === 0) return ""
    let pre = strs[0],
        k = 1,
        cur = '';
    while (k < strs.length) {
        cur = strs[k]
        while (cur.indexOf(pre) !== 0) {
            pre = pre.substring(0, pre.length - 1)
        }
        if (pre === '') return ''
        k++
    }
    return pre
};

```

### 14. 三数之和
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum

#### 解题思路：双指针

首先题目要求结果不包含重复三元组，而在给出的nums中又可能出现重复的元素，因此可以先对nums进行一次排序，这样做的意义一是方便使用双指针，二是遍历中也方便跳过重复项

那么应该怎样找出三个相加为0的三元组呢？具体步骤如下:

先找出一个基点，假设这个基点索引为i，nums长度为n，那么剩下2个与基点相加为0的元素就是在[i+1,i+2,.....,n-2,n-1]中寻找
确定寻找范围后，就可以依靠双指针法，如下图: 0015-01.png 假设j=i+1,k=n-1,然后判断nums[i]+nums[j]+nums[k]的值是否为0，从上图可以看出-2-1+4>0，所以k值要往左移动，如下图: 0015-02.png k往左移动后nums[i]+nums[j]+nums[k]相加刚好为0，那么就可以把这个三元组放进结果数组中
在找到基点的第一组三元数组后并不意味着开始前往下一个基点，相反当前基点nums[i]可能存在2个及2个以上三元数组，所以需要以当前基点寻找，如下图： 0015-03.png 在找出第一组三元数组后，j加一,k减一，这个时候nums[i]+nums[j]+nums[k]同样为0,如下图 0015-04.png

最后只剩下一些边界条件的处理，比如：
1.当基点大于0的时候，就代表不符合题目条件，直接返回结果
2.当基点与前一个基点相同时，跳过本次循环
3.如上面说到的基于当前基点继续寻找三元数组时，j和k都要各自往左右移动，那么在左移或右移后有可能碰到相同项，那么就需要继续移动

#### 代码实现

```js

let threeSum = (nums) => {
    if (nums.length < 3) return []
    let sum,
        result = [];
    nums = nums.sort((a, b) => {
        return a - b
    });
    for (let i = 0; i < nums.length - 2; i++) {
        let a = nums[i]
        if (a > 0) return result;
        if (i > 0 && a === nums[i - 1]) continue;
        let j = i + 1, k = nums.length - 1;
        while (j < k) {
            let b = nums[j],
                c = nums[k],
                sum = a + b + c;
            if (sum === 0) {
                result.push([a, b, c]);
                j++;
                k--;
                while (nums[j] === b) {
                    j++
                }
                while (nums[k] === c) {
                    k--
                }
            } else if (sum > 0) {
                k--
            } else {
                j++
            }
        }
    }
    return result
};

```

### 15. 最接近的三数之和
给定一个包括 n 个整数的数组nums和一个目标值target。找出nums中的三个整数，使得它们的和与target最接近。返回这三个数的和。假定每组输入只存在唯一答案。

例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest

#### 解题思路：双指针

这一题和上一题(三数之和)其实大同小异的，都可以通过双指针来解决。

首先应该对nums进行排序，确保数组有序可以使用双指针。与上一题相同点在于都需要有一个基点i，以此基点为核心进行指针滑动，具体步骤如下：

先设置以下变量：
sum:用于缓存nums[i]+nums[j]+nums[k]之和
distance:距离target的距离，用绝对值表示，初始值设为无限大
result:最终返回的结果值
定义好双指针的位置，设置j=i+1,k=nums.length-1，然后计算三个元素之和，同时算出距离target的距离绝对值distance，如下图： 0016-01.png
由上图可以得出sum=-3，distance=|1-(-3)|=4，由于distance初始值为无限大，所以更新result和distance值
在判断是否更新distance后仍然需要基于基点进行遍历，当sum小于target时j往右移动，相反则k往左移动，如下图： 0016-02.png
这个时候算出distance离target更近了，所以更新result和distance。
循环第2、3步
#代码实现

```js

let threeSumClosest = (nums, target) => {
    if (nums.length < 3) return [];

    nums = nums.sort((a, b) => {
        return a - b;
    });
    let sum = 0,
        distance = Infinity,
        result;
    for (let i = 0; i < nums.length - 2; i++) {
        let a = nums[i];
        if (i > 0 && nums[i - 1] === a) continue;
        let j = i + 1,
            k = nums.length - 1;
        while (j < k) {
            let b = nums[j],
                c = nums[k];
            sum = a + b + c;
            if (Math.abs(target - sum) < distance) {
                distance = Math.abs(target - sum)
                result = sum
            }
            if (sum < target) {
                j++
            } else {
                k--
            }
        }
    }
    return result
};

```

### 16.电话号码的字母组合
给定一个仅包含数字2-9的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

title

示例:

输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明: 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/

#### 解题思路：

从题目可以看出就是一条组合题，组合题最常见的做法毫无疑问是递归，那么问题来了该怎么去递归呢，在弄清楚如何去递归前先画一张多叉树图，如下： 0017-01.png
以例子输入23为例，出去根结点外还有2层子节点，可以看到先把abc拆开，再去和def逐个结合在一起，那么转化为计算思路其实也很简单，步骤如下：

新建一个专用于递归的combine函数，函数方法主要接收3个参数：
index：当前组合位置
s: 当前组合字符串
len：电话号码长度，用于判断是否于组合位置相等终止递归

在combine内建一个映射集map，存贮数字对应的字符串，根据index取出字符串，假设这个字符串为letters，那么开始对letters每一个字符进行递归

在进入第一层递归假设字符为s1，s1下面要与def进行组合，那么这个时候又可以从def取出一个字符，假设为s2，进行第二层递归，而第一层递归和第二层递归组合的结果为s1s2

当进入第二层递归后，组合的字符串长度已经等于len，那么这个时候就到达终止递归的条件，把组合字符放入结果数组中

#代码实现

```js

const letterCombinations = function (digits) {
    let res = [];
    if (!digits) return [];
    let findCombination = function (len, index, s) {
        if (index === len) {
            res.push(s);
            return
        }
        let c = digits[index],
            map = [" ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
        if (c < 0 || c > 9 || c === 1) return;
        let letters = map[parseInt(c)];
        for (let i = 0; i < letters.length; i++) {
            findCombination(digits.length, index + 1, s + letters[i])
        }
    };
    findCombination(digits.length, 0, "");
    return res
};

```

### 17. 四数之和

给定一个包含 n 个整数的数组nums和一个目标值target，判断nums中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与target相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：

给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum

##### 解题思路：滑动窗口

与前面一条三数之和一样思路也是使用滑动窗口，那么对比三数之和又有什么差别呢，先来回忆下三数之和的解题思路

寻找基点，在基点之后的区间进行窗口滑动，假设基点为a，窗口两端为b和c,通过不断判断a+b+c相对大小移动b或c得到结果
当然还有三数之和求的是0，四数之和求的事target，这里就把0看成target即可
那么按照三数之和的思路解决四数之和,可以看成

a+b+c+d=target => a+_target=target
上面的代码意思就是把b+c+d看成一个求三数之和等于_target，那么_target=target-a,也就是说对比三数之和的逻辑只是多了一层逻辑，代码如下:

for(let i=0;i<nums.length-3;i++){
  let _target = target - nums[i]
  ...
}
在求出_target后就可以按照原来三数之和的逻辑进行计算

#代码实现

```js

const fourSum = (nums, target) => {
    let result = [],
        sum;
    nums = nums.sort((a, b) => {
        return a - b
    });
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let _target = target - nums[i];
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let l = j + 1,
                r = nums.length - 1;
            while (l < r) {
                sum = nums[j] + nums[l] + nums[r];
                if (sum === _target) {
                    result.push([nums[i], nums[j], nums[l], nums[r]]);
                    l++;
                    r--;
                    while (nums[l] === nums[l - 1]) l++;
                    while (nums[r] === nums[r + 1]) r--;
                } else if (sum < _target) {
                    l++;
                } else {
                    r--;
                }
            }
        }
    }
    return result;
};

```
