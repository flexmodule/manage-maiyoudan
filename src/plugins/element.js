import Vue from 'vue';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
	Menu,
	Row,
  Col,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';


Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);


Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;