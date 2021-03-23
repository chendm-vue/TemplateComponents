module.exports = {
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#409EFF",
        success: "#67C23A",
        warning: "#E6A23C",
        danger: "#F56C6C",
        info: "#909399",
        main: "#303133",
        normal: "#606266",
        secondary: "#909399",
        placeholder: "#C0C4CC",
        // 一级边框
        border1: "#DCDFE6",
        // 二级边框
        border2: "#E4E7ED",
        // 三级边框
        border3: "#EBEEF5",
        // 四级边框
        border4: "#F2F6FC"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
