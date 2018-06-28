(function($){
	$(function(){
		var beginTimeTake;
            
        $('.time-start').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            timePicker24Hour : true,
            timePicker : true,
            "locale": {
                format: 'YYYY-MM-DD HH:mm',
                applyLabel: "应用",
                cancelLabel: "取消",
                resetLabel: "重置",
            }
        }, 
        function(start, end, label) {
            beginTimeTake = start;
            if(!this.startDate){
                this.element.val('');
            }else{
                this.element.val(this.startDate.format(this.locale.format));
            }
        });
        $('.time-end').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            timePicker24Hour : true,
            timePicker : true,
            "locale": {
                format: 'YYYY-MM-DD HH:mm',
                applyLabel: "应用",
                cancelLabel: "取消",
                resetLabel: "重置",
            }
        }, 
        function(start, end, label) {
            beginTimeTake = end;
            if(!this.startDate){
                this.element.val('');
            }else{
                this.element.val(this.startDate.format(this.locale.format));
            }
        });
		
	})
})(jQuery)
