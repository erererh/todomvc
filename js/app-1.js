(function(angular) {
	'use strict';
	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', '$location', TodoController]);
		function TodoController ($scope, $location) {
			var vm = $scope;

			//任务列表
			var taskList = [
				{id: 1, name: '11', isCompleted: false},
				{id: 2, name: '22', isCompleted: true},
				{id: 3, name: '33', isCompleted: false}
			];
			vm.taskList = taskList;

			// 2.添加任务
			// （往数组添加文本框中的内容、清空文本框）
			vm.newTask = '';
			vm.add = function(){
				if(vm.newTask.trim() === '') {
					return;
				}
				var id,len = vm.taskList.length;
				if(len === 0) {
					id = 1;
				} else {
					id = vm.taskList[len-1].id + 1;
				}
				vm.taskList.push({id: id,name: vm.newTask, isCompleted: false});
				// vm.allChecked = false;
				vm.checkToggle();
				vm.newTask = '';
			};

			// 3. 删除任务(根据当前ID)
			vm.remove = function (id) { 
				for(var i = 0; i < vm.taskList.length; i++) {
				//因为删除任务会改变数组的长度，所以不能给数组长度定义变量赋值
				// for(var i = 0, j = vm.taskList.length; i < j; i++) {
					if( vm.taskList[i].id === id) {
						vm.taskList.splice(i, 1);
					}
				}
			};

			//4.修改任务
			//(绑定双击事件 ng-dblclick、双击后添加 editing类、展示对应文本框的名称)
			vm.editId = 0;
			vm.edit = function(id) {
				vm.editId = id;
			};
			vm.update = function () {
				vm.editId = 0;
			};

			//5.切换选中状态
			//(其他方式： 监视 allChecked 变化)
			vm.allChecked = false;
			vm.checkAll = function() {
				vm.taskList.forEach(function(task) {
					task.isCompleted = vm.allChecked;
				});
			};
			//反选
			vm.checkToggle = function() {
				vm.allChecked = vm.taskList.every(function(task) {
					return task.isCompleted;
				});
			};

			//6.清除已完成任务
			//（保留未完成任务、清除按钮的展示与隐藏）
			vm.clearAll = function() {
				var temp = [];
				vm.taskList.forEach(function(task, i) {
					if(!vm.taskList[i].isCompleted) {
						temp.push(vm.taskList[i]);
					}
				});
				vm.taskList = temp;
			};

			vm.isShow = function() {
				var temp = false;
				vm.taskList.forEach(function(task, i) {
					if(vm.taskList[i].isCompleted) {
						temp = true;
						// break;        //会报错，不用才对
					}
				});
				return temp;
			};

			// 7.显示未完成任务数
			vm.getUnCompleted = function() {
				var count = 0;
				vm.taskList.forEach(function(task) {
					if(!task.isCompleted) {
						count++;
					}
				});
				return count;
			};

			//8.显示不同状态的任务（全部、未完成、已完成）
			//(单击显示对应状态且添加 selected 类)
			//9.根据URL变化显示相应的任务（哈希值 hash）
			vm.selectedStatus = {isCompleted: undefined};

			vm.location = $location;
			vm.$watch('location.url()', function(newValue, oldValue) {
				switch (newValue) {
					case '/':
						vm.selectedStatus = {isCompleted: undefined};
						break;
					case '/active':
						vm.selectedStatus = {isCompleted: false};
						break;
					case '/completed':
						vm.selectedStatus = {isCompleted: true};
						break;
				}
			});	
		}
})(angular);