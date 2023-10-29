module.exports = {
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json'
      }
    }
  ],
  printWidth: 120, // 一行最多 120 字符
  tabWidth: 2, // 使用 2 个空格缩进
  semi: false, // 句尾省略分号
  singleQuote: true, // 使用单引号而不是双引号
  singleAttributePerLine: true, // 多个 attribute 的元素应该分多行撰写，每个 attribute 一行；只有一个 attribute 的一行显示
  useTabs: false, // 用制表符而不是空格缩进行
  quoteProps: 'as-needed', // 仅在需要时在对象属性两边添加引号
  jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号
  trailingComma: 'es5', // 末尾逗号
  bracketSpacing: true, // 大括号内的首尾需要空格
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素反尖括号需要换行
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号 avoid
  rangeStart: 0, // 每个文件格式化的范围是开头-结束
  rangeEnd: Infinity, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准 always
  htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行
  vueIndentScriptAndStyle: false, //（默认值）对于 .vue 文件，不缩进 <script> 和 <style> 里的内容
  endOfLine: 'auto', // 换行符使用
  embeddedLanguageFormatting: 'auto' //（默认值）允许自动格式化内嵌的代码块,
}