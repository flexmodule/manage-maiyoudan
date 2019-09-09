import $http from "@/utils/request"
const getPlanList = (params) => $http('/maiyou/api/indexlist','get',params);
const getGoodsList = (params) => $http('/maiyoudan/bussiness','get',params);
const addGoodsList = (params) => $http('/maiyoudan/addgoods','post',params);
export default {
	getPlanList,
	getGoodsList,
	addGoodsList
}
