var app = angular.module('TesterApp', ['autoAddInput']);

app.controller('mainCtrl', ['$scope', function($scope){

	//$scope.text = ["vinay"];

	console.log("called ctrl")

  
	
}]);

function press() {
	console.log("pressing")
}

app.directive('jsTester', ['$compile', function($compile){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {

			 
                 $scope.compiled = false;
				 $scope.editor = ace.edit("editor");
			     $scope.editor.setTheme("ace/theme/monokai");
			     $scope.editor.getSession().setMode("ace/mode/javascript");
			     $scope.editor_ele = angular.element($element[0].getElementsByClassName("editor"));
			     $scope.editor_ele.css({"font-size":"13px"});




           			$scope.runScript = function() {

           				//console.log(clear())

		               //iElm.remove("#script");
                        
                        var script = document.createElement('script');
						script.innerText = $scope.editor.getValue()	;
                        $element.append(script);


                        $element[0].children[1].remove();

                        $scope.save();

					 
					}

					$scope.save = function() {
						localStorage.setItem($scope.tester_id + "_js_tester", $scope.editor.getValue());
					}

					$scope.textSize = function(arg) {
					   var size = $scope.editor_ele[0].style.fontSize.replace(/([0-9]*)px/g,"$1");
					   
                       if(arg == 1) {
                       	  size = parseInt(size) +1;
                       	  $scope.editor_ele.css({"font-size":size});
                       } else {
                       	 size = parseInt(size) -1;
                       	 $scope.editor_ele.css({"font-size":size})
                       }
					}

					$scope.getValueFromStorage = function() {
						$scope.editor.setValue(localStorage.getItem($scope.tester_id + "_js_tester"));
					}


			     



		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		template: `
		            <div class="main">
		            <div class="titlebar">

		             <span class="title">Console Tester</span>

                      <span class="action" ng-click="runScript()"><i class="material-icons">play_arrow</i> Run</span>

                       <span class="action" style="padding-right:0px">Font Size<span class="indi">  <span ng-click="textSize(1)"><i class="material-icons">arrow_drop_up</i></span><span ng-click="textSize(0)"><i class="material-icons">arrow_drop_down</i></span>  </span></span>


		            </div>
						<div id="editor" class="editor"></div>
				    </div>		
				 `,
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		 compile: function(iElm, tAttrs,transclude) {
		 	return {
                 
                pre: function ($scope, $element, $attr) {
		            angular.element($scope.editor_ele[0].children[0]).attr("ng-keyup", "press()");
		          },
         		post: function ($scope, element, attrs, ngModel) {

         			$scope.tester_id = attrs.id;

         			// if($scope.compiled == false) {
         			//   $scope.compiled = true;
         			//    $compile(element.contents())($scope); //compile to take key-press effect
         			// }
           
                   
                    $scope.getValueFromStorage();

					$scope.runScript();

				    

				    




          		}


		 	}
		 }
	};
}]);