---
title: "Clean Code 2장"
category: "Etc"
date: "2022-04-02 15:19:00 +09:00"
desc: "의미있는 이름"
thumbnail: "./images/clean_code/cleancode_th.jpg"
alt: "의미있는 이름"
---


![Untitled](https://user-images.githubusercontent.com/85836879/170287867-3709eb24-6259-4e6e-96c8-f27a19a35818.png)

## 2장 의미있는 이름

---

변수, 클래스, 함수등의 이름을 정하는 기준을 알려주는 챕터
#
변수, 클래스, 함수의 이름은 존재 이유, 수행하는 기능, 사용하는 방법등을 나타내는 표현이다.
#
부연 설명이 필요한 주석이 필요하다면 의도를 분명하게 드러내지 못했다는 말이며 
#
우리는 작명의 기준에 대해 재고해 봐야한다.
#
### 목차

---

- [x]  의도를 분명하게 밝혀라
- [x]  그릇된 정보를 피하라
- [x]  의미 있게 구분하라
- [ ]  발음하기 쉬운 이름을 사용하라
- [ ]  검색하기 쉬운 이름을 사용하라
- [ ]  인코딩을 피하라
    - [ ]  헝가리식 표기법
    - [ ]  멤버 변수 접두어
    - [x]  인터페이스 클래스와 구현 클래스
- [ ]  자신의 기억력을 자랑하지 마라
- [ ]  클래스 이름
- [ ]  메서드 이름
- [ ]  기발한 이름은 피하라
- [ ]  한 개념에 한 단어를 사용하라
- [x]  말장난을 하지 마라
- [x]  해법 영역에서 가져온 이름을 사용하라
- [ ]  문제 영역에서 가져온 이름을 사용하라
- [ ]  의미 있는 맥락을 추가하라
- [ ]  불필요한 맥락을 없애라
#
### 2-1 의도를 분명하게 밝혀라

---

의도가 분명한 이름을 지어라.
#
좋은 이름으로 지으려는 시간으로 인해 좋은 이름으로 절약하는 시간이 더 많아진다.
#
주석의 작성은 의도를 분명히 드러내지 못함을 의미하는 표현이다.

```go
var d int = 0 // 경과 시간 ( 단위 : 날짜 )
```
#
측정하려는 값과 단위를 표현하는 이름이 필요하다.

```go
var elapsedTimeInDays int = 0
daysSinceCreation := 0
daysSinceModification := 0
fileAgeInDays := 0
```
#
의도가 드러나는 이름을 사용하면 코드 이해와 변경이 쉬워진다.

```go
array := []string{"bulgogi","ramen","kimchi", "coffee"}

juwon := []string{"kimchi","bulgogi"}

for arrayIdx, arrayValue = range array{
	for juwonIdx, juwonValue = range juwon{
		if arrayValue == juwonValue {
			fmt.Println(arrayValue, juwonValue)
		}
	}
}
```
#
두개의 배열 array와 juwon가 존재할 때 변수명만으로도 무엇을 담고있는 배열인지 알 수 없다.
#
array 배열에는 무엇이 들어있고 
#
두 값을 왜 비교해야하며
#
같으면 출력하는게 무슨 의미인지
#
에 대한 정보가 전혀 드러나지 않는다.
#
정보 제공은 충분히 가능했지만 그렇지 않았다.
#
우리가 좋아하는 메뉴 리스트를 출력해주는 프로그램을 만든다고 가정해보자
#
그렇다면  array가 메뉴리스트라는 사실을 우리는 알 수 있다.
#
array를 menuList로 변경해보자 
#
값이 같다면 메뉴리스트 중 좋아하는 메뉴다.

```go
menuLsit := []string{"bulgogi", "ramen", "kimchi", "coffee"}
favoriteFood := []string{"kimchi", "bulgogi"}

	for _, menu := range menuLsit {
		for _, food := range favoriteFood {
			if menu == food {
				fmt.Println(menu)
			}
		}
	}
```

![Untitled 1](https://user-images.githubusercontent.com/85836879/170287947-d26b77a9-c66d-4645-91dd-afcfe641f529.png)

#
코드의 단순성은 변하지 않았지만 코드는 더 명확해 졌다. 
#
### 2-2 그릇된 정보를 피하라

---

프로그래머는 코드에 그릇된 단서를 남겨서는 안된다.
#
예를 들어 arr, list, data, a1, a2, userInfo는 변수 이름으로 적합하지 않다.
#
불용어이기 때문이다. ( 불용어 : 필요없는 단어 )
#
프로그래머에게는 List라는 단어는 특수한 의미이다.
#
무언가를 담는 컨테이너가 실제 List가 아니라면 ( map이라면? ) 그릇된 정보를 제공하는 셈이다.
#
하나의 모듈에서 
#
XYXControllerForEfficientHandlingOfStrings
#
XYXControllerForEfficientStorageOfStrings
#
두개의 단어는 매우 비슷하다.  좋지 않다.
#
유사한 개념은 유사한 표기법을 사용한다.
#
IDE에서 제공해주는 자동완성기능을 통해 변수명을 선택한다면 유용하게 쓸 수도 있다.
#
### 2-3 의미있게 구분하라

---

불용어를 추가한 이름 역시 아무런 정보도 제공하지 못한다.

```go
type product struct{
	name string
	productSeq int
}

type productData struct{
	saleCnt int
	orderId int
	isSale bool
}
```

product라는 구조체가 있다 가정하면 다른 구조체를 productData라고 부른다면 
#
개념은 구분하지 않은채 이름만 달리한 경우이다.
#
의미가 분명하게 다르다면 사용해도 무방하지만 zork와 theZork라 이름지어서는 안된다.
#
또한 불용어를 피해야한다.
#
variable이라는 단어 혹은 table등의 이런 불용어를 사용하거나
#
name과 nameString 중 name이 다른 타입이 될 수 있는 가능성은 없다.
#
따라서 그릇된 정보를 피하라는 규칙을 위반하게 된다.
#
Product라는 구조체와 ProductInfo라는 클래스를 반견한다고 해도 차이를 느끼기 어렵다 
#
> example

- moneyAmount와 money
#
- customerInfo와 customer
#
- accountData와 account
#
- theMessage와 message
#

이들은 서로 구분이 안된다.
#
코드를 읽는 사람이 두개의 차이를 알도록 이름을 지어라.
#
### 2-4 검색하기 쉬운 이름을 사용하라

---

MAX_CLASS_PER_STUDENT는 검색 기능을 이용해 찾기 쉽지만 
#
7은 까다롭다
#
7이 들어가는 다른 파일도 검색되기 때문이다.
#
따라서 쉬운 단어를 이용해 읽는 사람이 숫자가 아닌 문자를 검색하게 해야한다.
#
### 2-5 인코딩을 피하라

---

```go
PhoneNumber phoneString
```

타입은 바뀌어도 이름은 바뀌지 않는다.
#
### 멤버 변수 접두어

m_이라는 접두어를 붙여서 변수를 만들 필요없다.
#
### 인터페이스와 구현체

IuserInterface의 I라는 interface 접두어를 붙이지 않고 구현체에 구현체임을 나타내는 이름을 사용한다.
#
1. userRepository와 userRepositor
#
2. userService혹은 userServiceImple

( 2보다는 1이더 낫다 )
#
### 2-6 자신의 기억력을 자랑하지 마라

---

반복문의 인덱스는 i, j, k 이외의 것은 사용하지말고 address를 r과 같이 사용하지 마라.
#
항상 읽는 사람 입장에서 이해하기 쉬운 코드를 작성하는 습관을 갖자.
#
### 2-7 클래스 이름

---

클래스명, 객체명은 명사, 명사구를 사용한다.
#
> example

- Customer, WikiPage, Account
#
### 2-8 메서드 이름

---

메서드명, 함수명은 동사, 동사구가 적합하다.
#
> example

- postPayment, deletePage, save
#
접근자, 변경자, 조건자는 get, set, is를 붙인다.
#
### 2-8 기발한 이름은 피하라

---

프로그래머가 재치를 발휘해 구어체나 속어를 사용하는 경우가 존재한다.
#
하지만 의도를 분명하고 솔직하게 표현해야한다.
#
읽은 사람 입장에서
#
### 2-9 한 개념에 한 단어를 사용하라

---

DeviceController를 사용하면서 다른 곳에서는 ProtocolManager라던지 
#
Controller와 Manager라는 단어를 혼용해서 쓰는건 좋지 않다.
#
get, fetch와 같은 접두어를 하나만 적용해서 사용해야한다.
#
일관성이 있는 단어를 사용해야 한다.
#
### 2-10 말 장난을 하지마라

---

한 단어를 두가지 목적으로 사용하지 마라. 

```go
func add(a,b int) int {
	return a + b
}

func addList(a [] int, b int) [] int{
	return a.append(a, b)
}
```

함수 add와 addList는 맥락이 다르다. 
#
따라서 insert 혹은 append라는 이름이 적당하다.
#
add라고 부른다면 말장난과 다름이 없다.
#
### 2-11 해법 영역에서 가져온 이름을 사용하라

---

코드를 읽는 사람도 프로그래머이다. 
#
기술 개념에는 기술 이름이 가장 적합한 선택이다.
#
### 2-12 문제 영역에서 가져온 이름을 사용하라

---

적절한  프로그래밍 용어가 없다면 해당 문제 영역에서 이름을 가져와야 한다.
#
또한 해법 영역과 문제 영역을 구분할 줄 알아야한다.
#
### 2-13 의미 있는 맥락을 추가하라

---

firstName, lastName, street, houseNumber, city, state, zipcode 라는 변수가 존재한다면 
#
주소를 의미하는 것을 알 수 있다.
#
하지만 state라는 변수 하나만 사용한다면 주소의 일부라는 것을 알 수 없다.
#
따라서 address의 의미를 갖는 접두어 addr를 붙여 
#
addrFirstName, addrState, addrZipcode라 쓰면 맥락이 분명해지고 주소라는 것을 알 수 있다.
#
### 2-14 불필요한 맥락을 없애라

---

일반적으로 의미가 분명한 경우에 한해서 짧은 이름이 긴 이름보다 좋다.
#
이름에 불필요한 맥락을 추가하지 않도록 주의해야 한다.
#
### 결론

---

좋은 이름을 지으려면 설명 능력이 뛰어나고 문화적인 배경이 같아야한다.
#
소개한 규칙들중 몇 개를 적용해 가독성이 높아지는 지 살펴봐라.
#
좋은 이름이 있다면 피드백을 통해 수정하는 것이 좋은 변수명을 선택하는 방법이다.
#
## 3장 함수

---