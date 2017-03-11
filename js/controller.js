(function(angular){
	angular
		.module('todoApp.controller', ['ngRoute'])
		//配置路由
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:status?', {
				templateUrl: './views/todo.html',
				controller: 'TodoController'
			})
		}])
		.controller('TodoController', ['$scope', '$routeParams', 'DataService', TodoController]);
		function TodoController ($scope, $routeParams, DataService) {
			var vm = $scope;

			//1.任务列表
			
			// vm.taskList = taskList;
			vm.taskList = DataService.getData();

			// 2.添加任务
			// （往数组添加文本框中的内容、清空文本框）
			vm.newTask = '';
			vm.add = function(){
				if(vm.newTask.trim() === '') {
					return;
				}
				DataService.setData( vm.newTask )
				vm.allChecked = false;
				// vm.checkToggle();
				vm.newTask = '';
			};

			// 3. 删除任务(根据当前ID)
			vm.remove = function ( id ) { 
				DataService.remove( id );
			};

			//4.修改任务
			//(绑定双击事件 ng-dblclick、双击后添加 editing类、展示对应文本框的名称)
			vm.editId = 0;
			vm.edit = function( id ) {
				vm.editId = id;
			};
			vm.update = function () {
				vm.editId = 0;
				DataService.save();
			};

			//5.切换选中状态
			//(其他方式： 监视 allChecked 变化)
			//反选
			vm.checkToggle = function() {
				vm.allChecked = DataService.checkToggle(); 
				DataService.save();
			};
			vm.allChecked = DataService.checkToggle();
			vm.checkAll = function() {
				DataService.checkAll( vm.allChecked );
			};
			
			//6.清除已完成任务
			//（保留未完成任务、清除按钮的展示与隐藏）
			vm.clearAll = function() {
				DataService.clearAll();
			};

			vm.isShow = function() {
				return DataService.isShow();
			};

			// 7.显示未完成任务数
			vm.getUnCompleted = function() {
				return DataService.getUnCompleted();
			};

			//8.根据URL变化显示相应的任务（哈希值 hash）
			vm.selectedStatus = {isCompleted: undefined};
			switch ($routeParams.status) {
				case 'active':
					vm.selectedStatus = {isCompleted: false};
					break;
				case 'completed':
					vm.selectedStatus = {isCompleted: true};
					break;
				default :
					vm.selectedStatus = {isCompleted: undefined};
					break;
			}
		}
})(angular);
