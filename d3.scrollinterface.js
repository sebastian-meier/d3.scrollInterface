/*global d3:false */
/*jshint unused:false*/
/*jshint -W004 */

function debouncer( func , timeout ) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        } , timeout );
    };
}

function d3_scrollinterface(){
    var selection, scrolls;

    var scroller_config = {
        window:{
            height:0,
            width:0
        },
        offset:50,
        items:[
            /*{
                fullscreen:true,
                addscroll:2000,
                obj:false
            }*/
        ]
    };

    function scrollinterface(sel){
        selection = sel;
		scrollinterface.init();
        scrollinterface.resize();
        scrollinterface.set();

        d3.select(window)
            .on("scroll.scrollinterface", scrollinterface.scroll);

        d3.select(window)
            .on("resize.scrollinterface", function(){
                debouncer(function(e){
                    scrollinterface.resize();
                }, 200);
            });
    }

    scrollinterface.init = function(){
        //Acquire data on the pages container
        scrolls = selection.selectAll('.scroller_item');
        scrolls.each(function(d){
            var that = d3.select(this);
            scroller_config.items.push(
                {
                    fullscreen:((that.attr('data-fullscreen')==="true")?true:false),
                    addscroll:parseInt(that.attr('data-addscroll')),
                    obj:false
                }
            );
        });
    };

    scrollinterface.resize = function(){
        scroller_config.window.height = window.innerHeight;
        scroller_config.window.width = window.innerWidth;

        scrolls
            .style("height", function(d,i){
                return ((scroller_config.items[i].addscroll>0)? (window.innerHeight-scroller_config.offset+scroller_config.items[i].addscroll)+"px" : 'auto');
            });

        scrolls.each(function(d, i){
            d3.select(this).select('.scroller_content')
                .style("height", function(d){
                    return ((scroller_config.items[i].fullscreen)? (window.innerHeight-scroller_config.offset)+"px" : 'auto');
                });
        });

        var st = $(window).scrollTop();
        scrolls.each(function(d, i){
            var bb = d3.select(this).node().getBoundingClientRect();
            scroller_config.items[i].top = bb.top+st;
            scroller_config.items[i].height = bb.height;
            if(scroller_config.items[i].obj){
                scroller_config.items[i].obj.resize();
            }
        });

        scrollinterface.scroll();
    };

    scrollinterface.scroll = function(){
        var st = $(window).scrollTop() + scroller_config.offset;
        scroller_config.items.forEach(function(d,i,a){
            if(d.addscroll > 0){
                if(st >= d.top){
                    if(st < d.top+d.height-scroller_config.window.height){
                        d3.select('.scroller_item:nth-child('+(i+1)+')').style("padding-top", 0+"px").classed('active', true);
                        if(scroller_config.items[i].obj){
                            scroller_config.items[i].obj.update(((st-d.top)/(d.height-scroller_config.window.height)*100));
                        }
                    }else{
                        if(scroller_config.items[i].obj){
                            scroller_config.items[i].obj.update(100);
                        }
                        d3.select('.scroller_item:nth-child('+(i+1)+')').style("padding-top", (d.height-scroller_config.window.height+scroller_config.offset)+"px").classed('active', false);
                    }
                }else{
                    if(scroller_config.items[i].obj){
                        scroller_config.items[i].obj.update(0);
                    }
                    d3.select('.scroller_item:nth-child('+(i+1)+')').style("padding-top", 0+"px").classed('active', false);
                }
            }
        });
    };

    scrollinterface.set = function(){

    };

    return scrollinterface;
}
