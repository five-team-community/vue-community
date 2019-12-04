<template>
  <el-button @click="huoqu">获取</el-button>
</template>
<script>
export default {
    data() {
    return {
      currentPage: 1,
      formInline: {
        user: "",
        region: ""
      },
      loading: true,
      tableData: [],
      value2: '',
    };
  },
    methods:{
    huoqu(){
                    this.axios
            .post("/pay/moname", {
                payProject:'水费',
                userName:'张三'
            })
            .then(res => {
                this.tableData = res.data.data.pays;
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

}
</script>
