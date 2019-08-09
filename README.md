### yverify

---

字段验证工具

### 验证函数

---

#### 相等性验证

-   IsEqual IS Is is 等于
-   NotEqual NOT Not not 不等于

#### 包含性验证

-   Include IN In in 包含
-   Exclude EX Ex ex 不包含

#### 大小验证

-   MinNumber MINN Minn minn 最小值
-   MaxNumber MAXN Maxn maxn 最大值

#### 长度验证

-   MinLength MINL Minl minl 最小长度
-   MaxLength MAXL Maxl maxl 最大长度

#### 使用方式

```javascript
Yverify.Verify([
    {
        name: "名称",
        rules: [
            (method: ["IsEqual", "Include", "Exclude", "MinNumber", "MaxNumber", "MinLength"]),
            (assert: [
                ["1", "2", "3"], // 等于数组中任何一个值即通过
                ["2889"], // 数组中的字符串包含输入值则通过
                [5, 6], //排除5和6
                1, //最小值为1
                1000, //最大值为10
                3 //最小长度为3
            ])
        ],
        value: 6
    }
]);
Yverify.Verify([
    {
        name: "名称",
        rules: {
            IsEqual: {
                ko: "名称必须",
                value: ["1", "2", "3"]
            }, // 等于数组中任何一个值即通过
            Include: ["2889"], // 数组中的字符串包含输入值则通过
            Exclude: [5, 6], //排除5和6
            MinNumber: 1, //最小值为1
            MaxNumber: 1000, //最大值为10
            MinLength: 3 //最小长度为3
        },
        value: 6,

        other: {
            el: "#name"
        }
    }
]);
```

### 参数说明

Verify 函数参数传入一个数组，数组的每一项为一个对象的验证字段配置。
所有参数如上列所示。
