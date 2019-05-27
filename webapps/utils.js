(function (dlut) {
    dlut.utils = {
        tree: {
            /**
             *
             * @param tree 要遍历的树
             * @param callback 回调函数(node,index,way)
             *  index为父的第几个孩子
             *  如果返回false,则不继续遍历
             * @param option
             *  option.childName : 表示树的children的key
             *  option.returnList : 是否返回node列表
             *  option.setParentName : 如果设定,则按此变量将每个node赋parent值
             *  option.rootFirst : 从根节点开始执行callback
             */
            walk(tree, callback, option) {
                option = option ? option : {}
                var childName = option.childName ? option.childName : 'children'
                var returnList = option.returnList ? option.returnList : false
                var pName = option.setParentName ? option.setParentName : false
                var rootFirst = typeof option.rootFirst === undefined ? true : option.rootFirst
                var list = []
                var continueWalk = true

                function walk(tree, callback, index, lastWay) {
                    // 是否继续遍历,如果callback返回为false,则跳出搜索
                    if (continueWalk === false) return
                    // 复制路径
                    var way = lastWay.slice()
                    // 是否返回列表
                    if (returnList) list.push(tree)
                    // 设定父的引用
                    if (pName && way.length > 0) {
                        tree[pName] = way[way.length - 1]
                    }
                    // 执行callback
                    if (rootFirst) {
                        continueWalk = callback(tree, index, way)
                    }
                    // 记录路径
                    way.push(tree)
                    // 递归子节点
                    var children = tree[childName]
                    if (children)
                        for (var i = 0; i < children.length; i++) {
                            if (continueWalk !== false)
                                walk(children[i], callback, i, way)
                        }
                    if (!rootFirst && continueWalk !== false) {
                        continueWalk = callback(tree, index, way)
                    }
                }

                if (!(tree instanceof Array))
                    tree = [tree]
                for (var i = 0; i < tree.length; i++) {
                    walk(tree[i], callback, i, [])
                }
                if (returnList)
                    return list
            },
            /**
             * 将数组转化为树
             * @param list 要转化的数组
             * @param option
             *  option.idName : 数组表示id的key
             *  option.pidName : 数组表示pid的key
             *  option.childName : 生成树表示children数组的key
             * @returns {Array|*[]}
             */
            listToTree: function (list, option) {
                if (typeof option === 'undefined') option = {};
                if (typeof option.idName === 'undefined') option.idName = "id";
                if (typeof option.pidName === 'undefined') option.pidName = "pid";
                if (typeof option.childName === 'undefined') option.childName = "children";

                function getRootMap(list) {
                    var rootMap = {}
                    var rootList = [];
                    for (var i = 0; i < list.length; i++) {
                        var item = list[i];
                        var hasParent = false;
                        for (var j = 0; j < list.length; j++) {
                            if (item[option.pidName] === list[j][option.idName]) {
                                hasParent = true;
                                break
                            }
                        }
                        if (!hasParent)
                            rootMap[item[option.idName]] = item;
                    }
                    return rootMap
                }

                function toTree(data, pid) {
                    var tree = []
                    var temp
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][option.pidName] == pid) {
                            var obj = data[i]
                            temp = toTree(data, data[i][option.idName])
                            if (temp.length > 0) {
                                obj[option.childName] = temp
                            } else {
                                obj[option.childName] = []
                            }
                            tree.push(obj)
                        }
                    }
                    return tree
                }

                var rootMap = getRootMap(list)

                var tree = [];
                for (var pid in rootMap) {
                    var root = rootMap[pid]
                    root[option.childName] = toTree(list, pid)
                    tree.push(root)
                }

                return tree
            }
        }
    }
    dlut.tpl = function (type) {
        return function (url) {
            return dlut.templates[type + '/' + url + '.html']
        }
    }
    dlut.api.ajax = axios.create({
        baseURL: dlut.config.baseUrl,
        timeout: 1000,
    })
})(dlut)
