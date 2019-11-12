```golang

package main

import (
	"fmt"
	"strconv"
)

// boolean 数字 字符串 指针 数组 struct channel 函数 切片 interface map
func val() {
	var a string = "abc"
	b := 123
	const c = "unchange"
	// 枚举 iota
	const (
		d = 1<<iota // 1左移0位 1
		e						// 1左移1位 10  => 2
		f						// 1左移2位 100 => 4
	)
	fmt.Println(a, b, c)
	fmt.Println(d, e, f)
}

func loop(n int) string { // 5 => 101 13 => 1101
	var res string
	for ; n > 0; n /= 2 {
		res = strconv.Itoa(n % 2) + res // number => string
	}
	return res
}

// 值类型 和 引用类型 指针* 和 地址&
func transmit (a *int) {
	*a = 10
	fmt.Println("里面", *a)
}

// 数组 切片 容器
func arr () {
	var arr1 [3]int
	var arr2 = [...]int{0,1,2,3,4,5,6,7}
	fmt.Println(arr1, arr2)

	//for i, v := range arr2 {
	//	fmt.Println(i, v)
	//}

	s1 := arr2[2:6] // 2,3,4,5 下标: 0 1 2 3
	s2 := s1[3:5]   // 3，4     下标: 0 1
	//slice可以向后扩展 但是不能向前扩展

	fmt.Println(s1, s2)
	fmt.Println(len(s1), cap(s1))
	fmt.Println(len(s2), cap(s2))
}

func opera () {
	var arr []int
	arr = append(arr, 10)
	fmt.Println(arr)

	arr1 := [4]int{1,2,3,4}
	s2 := append(arr1[:1], arr1[3:]...) // 删除 2, 3
	fmt.Println(s2)
}

func obj () {
	m := map[string]string {
		"name": "Tom",
		"age": "16",
		"sex": "man",
	}
	fmt.Println(m) // 无序的，不一定按顺序打印

	for k,v := range m {
		fmt.Println(k,v)
	}

	v, ok := m["nam"]
	fmt.Println(v, ok) // 可以加一个参数来判断key是否存在
	delete(m, "name")
}

func main() {
	//fmt.Println(loop(5), loop(13))

	var val = 1
	//transmit(&val)
	//opera()
	obj()
	fmt.Println("外面", val)
}

```
