import $http from "@/utils/request"
const getPlanList = (params) => $http('/maiyou/api/indexlist','get',params.query);
const getGoodsList = (params) => $http('/maiyoudan/bussiness','get',params.query);
const addGoodsList = (params) => $http(`/maiyoudan/addgoods`,'post',params.query);
const modifygoods = (params) => $http(`/maiyoudan/modifygoods?id=${params.id}`,'post',params.query);
const deletegoods = (params) => $http(`/maiyoudan/deletegoods?id=${params.id}`,'post',params.query);
const modifygoodstatus = (params) => $http(`/maiyoudan/modifygoodstatus?id=${params.id}`,'post',params.query);
const getMerchantList = (params) => $http('/maiyoudan/merchant','get',params.query);
const addMerchant = (params) => $http(`/maiyoudan/addmerchant`,'post',params.query);
const modifyMerchant = (params) => $http(`/maiyoudan/modifymerchant?id=${params.id}`,'post',params.query);
const deleteMerchant = (params) => $http(`/maiyoudan/deletemerchant?id=${params.id}`,'post',params.query);
const modifyMerchantStatus = (params) => $http(`/maiyoudan/modifymerchantstatus?id=${params.id}`,'post',params.query);
const getUserList = (params) => $http('/maiyoudan/user','get',params.query);
const modifyismerchant = (params) => $http(`/maiyoudan/modifyismerchant?id=${params.id}`,'post',params.query);
const modifyisretail = (params) => $http(`/maiyoudan/modifyisretail?id=${params.id}`,'post',params.query);
const deleteuser = (params) => $http(`/maiyoudan/deleteuser?id=${params.id}`,'post',params.query);
export default {
	getPlanList,
	getGoodsList,
	addGoodsList,
	modifygoods,
	deletegoods,
	modifygoodstatus,
	getMerchantList,
	addMerchant,
	modifyMerchant,
	deleteMerchant,
  modifyMerchantStatus,
  getUserList,
  modifyismerchant,
  modifyisretail,
  deleteuser
}
