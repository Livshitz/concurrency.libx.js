export const chainTasks = async (tasks, eachCb?) => {
    var counter = 0;

    for(var i=0; i<tasks.length; i++) {
        var t = tasks[i];
        await t().then(()=> {
            if (eachCb) eachCb(counter++);
        });
    }
}