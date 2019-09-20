import Vue from 'vue';
import {
	Dropdown,
	Dialog,
  DropdownMenu,
  DropdownItem,
	Menu,
	Row,
	Col,
	Upload,
	Table,
  TableColumn,
	Input,
  Submenu,
	MenuItem,
	DatePicker,
  TimePicker,
	MenuItemGroup,
	Checkbox,
	Button,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
	Loading,
	Select,
	Option,
	Pagination,
  MessageBox,
  Message,
	Notification,
	Cascader
} from 'element-ui';
Vue.use(Dialog);
Vue.use(Cascader);
Vue.use(Upload);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Table);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Option);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(TimePicker);
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