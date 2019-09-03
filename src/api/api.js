import $http from "@/utils/request"
const getPlanList = (params) => $http('/maiyou/api/indexlist','get',params);
export default {
	getPlanList,
}
