---
title: "[Vue] Vue만의 문법 "
category: "Vue"
date: "2022-01-07 21:42:00 +09:00"
desc: "디렉티브란 무엇일까"
thumbnail: "./images/vue/vue_thumbnail.jpg"
alt: "vue"
---

![vue'](https://user-images.githubusercontent.com/85836879/170812108-41de980d-4454-401f-8929-60521b13bf58.png)
#

이번 포스팅 주제는 Vue만이 가지고 있는 문법 디렉티브입니다.

### Directive란
v- 접두어를 가지고 있는 문법을 말합니다.

#### v-text
```html
<span v-text="텍스트"></span>
<span>{{텍스트}}</span>
```

태그의 textContent를 업데이트합니다.
  
text의 일부만 업데이트해야 하는 경우엔 mustache interpolation(머스태시 보관법)을 사용합니다.
    
    
#### v-show
```html
<span v-show="flag">Flag가 참일 경우 보입니다.<span>
```

v-show 디렉티브는 조건이 변경될 때 transition을 전환합니다.

#### v-if
```html
<span v-if="flag">Flag가 참일 경우 보입니다.<span>
```

v-if는 자주 사용하는 디렉티브 중 하나입니다.

변수의 참과 거짓 여부에 따라 요소를 조건부로 렌더링 합니다.

요소와 포함된 디렉티브 / 컴포넌트는 전환하는 동안 파괴되거나 재구성됩니다.
  
밑에 나올 v-for와 v-if 간에는 v-for가 우선순위가 높기 때문에 v-if가 적용되지 않는 경우가 있습니다.

#### v-else
```html
<span v-if="flag">flag 참일 경우 보입니다.<span>
<span v-else>flag 참이 아닙니다.<span>
```

디렉티브 중 사용에 제약조건이 있는 디렉티브입니다.

이전의 형제요소에 v-if 혹은 v-else-if가 있어야 사용 가능합니다.

#### v-else-if
```html
<span v-if="flag">flag 참일 경우 보입니다.<span>
<span v-else-if="!flag">flag 거짓일 경우 보입니다.<span>
```

v-else와 마찬가지로 사용 제약 조건이 있는 디렉티브입니다.

#### v-for
```html
<div v-for=" item in items" :key="item">
  {{item.name}} 입니다.
 </div>

<div v-for=" item,idx in items" :key="idx">
  {{item.name}} 입니다.
  {{idx}}번째 인덱스입니다.
 </div>

<div v-for=" item in items" :key="item.idx">
  {{item.name}} 입니다.
  items의 {{item.idx}}번째 인덱스입니다.
 </div>
```
v-for 디렉티브는 v-if처럼 자주 사용되는 디렉티브입니다.
  
원본 데이터를 기준으로 요소 또는 템플릿을 데이터의 개수, 길이만큼 여러 번 렌더링 합니다.

특수 속성인 :key는 필수 입력 값입니다.

별칭(alias)을 제공합니다.

또는 인덱스의 별칭을 지정해 단순 인덱스(0, 1, 2...)를 구할 수 있습니다.

v-for의 기본 동작은 엘리먼트를 이동하지 않고 인 플레이스(in-place)패치를 시도합니다.

요소를 강제로 재 정렬하려면:key 특수 속성과 함께 정렬 데이터를 제공해야 합니다.

#### v-on
```html
<button @click="function(var, $event)"> 버튼 </button>
```
접두어 v-on은 많은 수식어를 가지고 있는 디렉티브입니다.

v-on은 @로 별칭을 제공합니다.

v-on:click은 @click과 같은 구문이며 event를 전달할 수 있습니다.

Pure JavaScript의 addEventListener와 같은 역할을 합니다.

#### v-bind
```html
<template>
  <img v-bind:src="imgSrc"/>

  <div :class="{ red : isRed }"> 한가지 css 클래스 바인딩 </div>

  <div :class="[{ red : isRed }, { displayFlex : ifFlex }]"> 두개 이상의 바인딩</div>

  <div :style="{ zIndex: zIndexState }"> css 스타일 바인딩 </div>

  <svg :view-box.camel="viewBox"></svg>
</template>

<script>
export default{
	data(){
    	return{
        	isRed : true,
          ifFlex : true,
          zIndexState : 1,
        }
    }
}
</script>

<style>
.red{
  background-color : red;
}
.displayFlex{
	display : flex;
}
</style>
```

v-bing는 요소의 동적 바인딩 기능을 구현하게 돕는 디렉티브입니다.

또한. camel 수식어를 사용하면 DOM 템플릿 사용 시에 속성 이름을 camelizing 할 수 있습니다.

#### v-model
```html
<input type="text" v-model="textInputValue"/>

<textarea v-model="textInputValue"></textarea>

...

data(){
	return{
    	textInputValue : '컴파일러가 자동으로 렌더링 해주는 디렉티브 입니다.',
    }
}
```
v-model은 입력 값에 따른 출력을 자동으로 바인딩하는 디렉티브입니다.

입력한 값에 따라 다양한 출력을 해줄 수 있는 유연한 디렉티브입니다.

select 마크업의 option:selected의 value 값을 가져올 수 있습니다.

#### v-slot
```html
<template>

	<template v-slot:other>
    	other content
    </template>

</template>
```
v-slot은 props 혹은 emit을 사용하여 컴포넌트간의 데이터를 전송할 때 사용하는 디렉티브 입니다.

제약조건으로 template태그 혹은 컴포넌트가 필요합니다.

### 특수한 속성의 디렉티브

#### key
```html
<div v-for="item, index in items" :key="index">
	<div>
    	안녕하세요 {{item.name}} 입니다.
    </div>
</div>
```

가장 일반적인 사용은 v-for 입니다.

동일한 부모의 자식 요소는 반드시 고유 키가 있어야 합니다.

키가 중복되면 렌더링 에러가 발생합니다.

v-for에서는 필수적인 디렉티브 입니다.

#### ref
```html
<span ref="span">
	Hello
</span>

<child-component :ref="(el) => child = el"></child-component>
```
ref는 요소나 자식 컴포넌트에 대한 참조를 등록할 때 사용합니다.

ref의 값은 부모 컴포넌트의 $refs 객체에 속합니다.

ref의 특성으로 ref는 자체 렌더 함수의 결과로 생성되기 때문에 초기 렌더링에서 접근할 수 없습니다.

[Vue.Js 디렉티브 공식문서](https://v3.ko.vuejs.org/api/directives.html)