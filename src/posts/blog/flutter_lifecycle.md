---
title: "Widget의 생명주기"
category: "Flutter"
date: "2022-05-22 14:26:00 +09:00"
desc: "Life Cycle"
thumbnail: "./images/flutter/flutter_logo.jpg"
alt: "flutter"
---

Flutter에서 Stateless Widget과 Stateful Widget은 서로 다른 생명주기를 가지고 있습니다.

예시 코드를 보면서 알아보겠습니다.

![statelesswidget-vs-statefulwidget-diagram-1536x1231](https://user-images.githubusercontent.com/85836879/174423154-ea713c48-10c0-468d-9b69-44c628a68e87.png)


### Stateless Widget LifeCycle

Stateless Widget은 단순히 화면을 구성하는 위젯이므로 단순한 생명주기를 가지고 있습니다.

### Stateless Widget의 Constructor

flutter에서 위젯은 기본적으로 클래스를 사용하여 생성합니다.

위젯은 기본적으로 클래스로 구성이 되어있기 때문에 클래스의 생성자를 사용할 수 있습니다.

위젯의 생성자와 클래스의 생성자는 동일한 역할을 가지며 마찬가지로 해당 위젯 안에서 사용될 변수들을 초기화할 때 사용합니다.

```js
import 'package:flutter/material.dart';

class Stless extends StatelessWidget {
  final String name;

  Stless({required this.name});

  ...
}
```

### Stateless Widget의 build

Widget의 builde 메서드는 화면에 렌더링 할 내용을 가지고 있습니다.

React의 render 함수와 동일한 역할을 하며 화면에 표시될 Widget들을 반환합니다.

```js
import 'package:flutter/material.dart';

class Stless extends StatelessWidget {
  
  ...
  
  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('stless widget'),
    );
  }
}
```

Stateless Widget은 자체적인 State(상태값)를 갖지 않습니다.

상태가 없기 때문에 부모 위젯 혹은 상위 위젯으로부터 전달받은 값이 변경되면 Widget이 rebuild 되어 화면을 갱신하게 됩니다.

이때 Constructor와 build 메서드가 다시 실행됩니다.

--- 

### Stateful Widget LifeCycle

Stateful Widget은 Stateless Widget과는 다르게 자체적인 State(상태값)를 가지고 있기 때문에 Widget의 생명주기 단계가 비교적 더 많습니다.

### Stateful Widget의 Constructor

Stateful Widget의 생성자도 Stateless Widget의 생성자와 동일한 역할을 합니다.

위젯 클래스로 인스턴스를 생성할 때, 생성자가 제일 먼저 호출하게 되며, 부모 위젯으로부터 매개변수를 전달받을 때 사용됩니다.

```js
class CounterStful extends StatefulWidget {
  final int count;

  CounterStful({required this.count})

  @override
  _CounterStfulrState createState() => _CounterStfulrState(count: count);
  
}

class _CounterStfulrState extends State<CounterStful> {
  int count;
  
  _CounterStfulState({required this.count})
  
  ...
  
}
```

### initState

Stateful Widget이 생성될 때 한번만 호출되는 함수로 State값을 초기화할 때 사용합니다.

상속받은 클래스인 State에 initState 메서드를 Override하여 사용할 수 있습니다.

```js
class _CounterStfulState extends State<CounterStful> {
  late int count;

  @override
  void initState() {
    super.initState();
    count = 0;
  }
  ...
}
```

### didChangeDependencies

didChangeDependencies 메서드는 Widget이 생성될 때 

initState함수가 호출된 바로 이후 한번만 호출합니다. 

하지만 InferitedWidget이나 Provider를 사용하는 경우 InferitedWidget이나 Provider의 상태가 변경될 때 마다 호출합니다.

```js
@override
void didChangeDependencies() {
  super.didChangeDependencies();

  print('_CounterStfulState didChangeDependencies');
}
```

즉 함수명 그대로 상위 위젯이나 자기 자신의 상태가 변화하거나 변경될 때 호출되지 않지만 

해당 위젯이 참조 혹은 의존하는 위젯이 변경된다면 didChangeDependencies 메서드가 작동합니다.

### didUpdateWidget

didUpdateWidget 메서드는 상위 위젯에 의해 rebuild가 필요한 경우 build 메서드의 호출 직전에 호출됩니다.

보통은 상위 위젯의 변화나 애니메이션을 다시 실행할 필요가 있을때 작동하며 자주 사용됩니다.

```js
@override
void didUpdateWidget(MyWidget oldWidget) {
  super.didUpdateWidget(oldWidget);
  if (widget.value != oldWidget.value) {
    // TODO: start a transition between the previous and new value
  }
}
```

상위 위젯의 변화에 따라 현재 위젯의 상태값을 초기화할 필요가 있다면 didUpdateWidget 메서드 안에서 setState를 통해 상태값을 다시 초기화 할 수 있습니다.

### Stateful Widget의 build

Stateless Widget의 build와 동일한 역할을 합니다.

화면에 표시될 내용을 작성하며 해당 내용을 반환합니다.

setState를 사용하여 Stateful 위젯의 상태가 변경될 때 다시 호출되여 화면을 다시 렌더링합니다.

### deactivate

Stateful Widget은 Stateless Widget과는 다르게 State(상태) 객체를 가지고 있습니다.

State가 변경되면 flutter는 Widget이 더럽다고(dirty) 인식하여 변경된 상태 객체를 사용해 해당 Widget을 rebuild(재렌더링)하게 됩니다.

deactivate 메서드는 상태 객체가 Widget Tree에서 제거될 때 호출됩니다.

flutter에서는 떄로 상태 객체만 제거된 후 다시 추가되는 경우가 있는데 GlobalKey를 사용하여 현재 위젯을 특정 위젯 트리 위치로 이동시키면 해당 위젯 상태 객체가 변경되므로 deactive가 실행되게 됩니다.

[(deactivate method)](https://api.flutter.dev/flutter/widgets/State/deactivate.html))

### dispose

Widget 객체가 Widget Tree에서 영구적으로 제거 될때 호출됩니다.

해당 Widget이 완전히 제거 되는 경우에 상태 객체 또한 함께 제거 되므로 deactivate가 먼저 호출되어 상태 객체가 제거 되었음을 알리고 이후에 dispose 메서드가 호출되어 Widget 객체가 제거되었음을 알립니다.

dispose 호출은 Widget 객체가 영구적으로 제거되었음을 의미하므로 setState를 사용하여 해당 위젯을 rebuild할 수 없습니다.

### 마무리...

---

### Statefule Widget 생성

Constructor -> initState -> didChangeDependencies -> build

### setState 호출

build

### InferitedWidget 또는 Provider의 값 변경

didChangeDependencies -> build

### 상위 위젯으로부터 전달받는 인자가 변경되었을 때

didUpdateWidget -> build

### 상태 객체가 제거되었을 때

deactivate -> build

### 위젯 객체가 제거될 때

deactivate -> dispose