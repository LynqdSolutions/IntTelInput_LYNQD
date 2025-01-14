export function onLoadListener(executionContext) {
    const formContext = executionContext.getFormContext();        
    window.parent.addEventListener("clickToCall", (event) => {
        var data = {
            "phonenumber": event.detail
        };

        var pageInput = {
            pageType: "entityrecord",
            entityName: "phonecall",
            data: data,
            createFromEntity: {
             "entityType": formContext.data.entity.getEntityName(),  
             "id": formContext.data.entity.getId(),  
             "name": formContext.data.entity.getPrimaryAttributeValue()     
            }
        };
    
        var navOptions = {
            target: 2,
            height: {value: 70, unit:"%"},
            width: {value: 80, unit:"%"},
            position: 1
        }
    
        Xrm.Navigation.navigateTo(pageInput, navOptions).then(
            function success(result) {
                console.log("Success");
            },
            function error(error) {
                console.log(error);
            }
        );
    }
    );
}