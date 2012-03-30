(function () {
    "use strict";
	
    function groupKeySelector(item) {
        return item.group.key;
    }

    function groupDataSelector(item) {
        return item.group;
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(groupKeySelector, groupDataSelector);
	
    WinJS.xhr({ url: "../data/Recipes.txt" })
			.then(function (xhr) {
				var items = JSON.parse(xhr.responseText);

				// Add the items to the WinJS.Binding.List
				items.forEach(function (item) {
					list.push(item);
				});
		});

    WinJS.Namespace.define("data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemsFromGroup: getItemsFromGroup
    });	
})();
