(function(angular){
	angular
		.module('todoApp.DataSrv', [])
		.service('DataService', ['$window', function($window){
			
			var localStorage = $window.localStorage;

			var dataStr = localStorage.getItem('todo');
			var taskList = JSON.parse( dataStr ) || [];
			this.taskList = taskList;
			
			// 1.获取数据 
			this.getData = function() {
				return this.taskList;
			};

			// 2.添加数据
			this.setData = function( name ) {
				var id,len = this.taskList.length;
				if(len === 0) {
					id = 1;
				} else {
					id = this.taskList[len-1].id + 1;
				}
				this.taskList.push({id: id, name: name, isCompleted: false});
				this.save();
			};

			// 抽离保存数据到 localStorage 中的方法
			this.save = function() {
				localStorage.setItem('todo', JSON.stringify( this.taskList ));
			};

			//3. 删除一条任务
			this.remove = function ( id ) {
				for(var i = 0; i < this.taskList.length; i++) {
					if( this.taskList[i].id === id) {
						this.taskList.splice(i, 1);
					}
				}
				this.save();
			};
			
			//5. 切换任务选中状态
			this.checkAll = function( allChecked ) {
				this.taskList.forEach(function( task ) {
					task.isCompleted = allChecked;
				});
				this.save();
			};
			
			//反选
			this.checkToggle = function() {
				this.allChecked = this.taskList.every(function(task) {
					return task.isCompleted;
				});
				return this.allChecked;
			};

			//6.清除已完成任务
			this.clearAll = function() {
				var temp = [];
				this.taskList.forEach(function(task, i) {
					if(!task.isCompleted) {
						temp.push(task);
					}
				});
				//重新获取任务列表
				this.taskList.length = 0;
				[].push.apply(this.taskList, temp);
				this.save();
			};

			this.isShow = function() {
				var temp = false;
				this.taskList.forEach(function(task, i) {
					if(task.isCompleted) {
						temp = true;
					}
				});
				return temp;
			};

			// 7. 显示未完成任务数
			this.getUnCompleted = function() {
				var count = 0;
				this.taskList.forEach(function(task) {
					if(!task.isCompleted) {
						count++;
					}
				});
				return count;
			};
		}])
})(angular);
