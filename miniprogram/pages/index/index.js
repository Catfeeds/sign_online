var api = require('../../utils/api.js');
var app = getApp();
Page({
    data: {
        systemInfo: {},
        _api: {},
        list: [],
        total: 0,
        loadingMore: false,
        noMoreData: false,
        searchInputShowed: false,
        searchInputVal: "",
        searchingResult: false,
        searchKeyword: "",
        currentPageNumber: 1,
    },
    
    onLoad() {
        // api.checkLogin();

        this.setData({
            _api: api,
        });

    },
    onShow() {

        let isLogin = wx.getStorageSync('login');
        if (!isLogin) {
            wx.navigateTo({
                url: '/pages/login/login'
            });
            return;
        }

        wx.getStorage({
          key: 'user',
          success: (res) => {
            console.log(res);
            this.setData({ user: res.data });
          },
          fail: (res) => {
            console.log(res);
          }
        });

        // console.log(app.pagesNeedUpdate);
        // if (app.pagesNeedUpdate['pages/index/index'] == 1) {
        //     let newItems = api.updatePageList('id');
        //     console.log(newItems);
        //     this.setData({
        //         list: newItems
        //     });
        // }

        // if (app.pagesNeedUpdate['pages/index/index'] == 'refresh') {
        //     this.onPullDownRefresh();
        // }
        // this.pullUpLoad();

        this.onPullDownRefresh();

        api.pageNeedUpdate('pages/index/index', 0);
    },
    /**
     * 下拉刷新
     */
    onPullDownRefresh() {
        this.currentPageNumber = 1;
        this.setData({
            noMoreData: false,
            noData: false
        });
        api.get({
            url: 'protocol/lists',
            data: {
                page: this.currentPageNumber,
                order:'-published_time',
                token: wx.getStorageSync('token'),
                status: 'all'
            },
            success: data => {
                let newItems = api.updatePageList('id', data.data.list, this.formatListItem, true);
                console.log(newItems);
                this.setData({
                    list: newItems
                });

                if (data.data.list.length > 0) {
                    this.currentPageNumber++;
                } else {
                    this.setData({
                        noMoreData: true
                    });

                    // 没有数据
                    // this.setData({
                    //     noMoreData: true,
                    //     noData: true
                    // });
                }

                wx.stopPullDownRefresh();
            }
        });
    },

    /**
     * 上拉刷新
     */
    pullUpLoad() {
        if (this.data.loadingMore || this.data.noMoreData) return;
        this.setData({
            loadingMore: true
        });
        wx.showNavigationBarLoading();
        console.log('pullUpLoad',this.data.currentPageNumber)
        api.get({
            url: 'protocol/lists',
            data: {
                page: this.data.currentPageNumber,
                order:'-published_time',
                token: wx.getStorageSync('token'),
                status: 'all'
            },
            success: data => {
                // api.deletePageListItem('id');
                let newItems = api.updatePageList('id', data.data.list, this.formatListItem);
                console.log(newItems);
                this.setData({
                    list: newItems
                });
                if (data.data.list.length > 0) {
                    this.currentPageNumber++;
                } else {
                    this.setData({
                        noMoreData: true
                    });

                    // 没有数据
                    // this.setData({
                    //     noMoreData: true,
                    //     noData: true
                    // });
                }
            },
            complete: () => {
                this.setData({
                    loadingMore: false
                });
                wx.hideNavigationBarLoading();
            }
        });
    },
    formatListItem(item) {
        if (item.Thumbnail) {
            item.Thumbnail = api.getUploadUrl(item.Thumbnail);
        }
        return item;
    },
    onReachBottom() {
        this.pullUpLoad();
    },
    onListItemTap(e) {
        let id = e.currentTarget.dataset.id;
        let status = e.currentTarget.dataset.status;
        let uid = e.currentTarget.dataset.uid;
        let type = e.currentTarget.dataset.type;
        let usertype = e.currentTarget.dataset.usertype; 
        let pcup_id = e.currentTarget.dataset.pcup_id;
        
        //检查是否已添加部门盖章
        if(this.data.user.user_type == 2) {
            wx.showLoading({title: '加载中...',})
            api.get({
                url: 'protocol/lists/checkSign',
                data: {
                    post_id: id,
                    uid: uid
                },
                success: data => {
                    wx.hideLoading()
                    
                    if(data.code == 0) {
                        wx.showToast({
                            title: data.msg,
                            icon: 'loading',
                            duration:1000
                        });
                        return !1;
                    }else if(data.code == 1) {
                        wx.navigateTo({
                            url: '/pages/protocol/protocol?id=' + id + '&status=' + status + '&uid=' + uid + '&type=' + type + '&usertype=' + usertype + '&pcup_id=' + pcup_id
                        });
                    }
                },
                complete: () => {
                    wx.hideLoading()
                    this.setData({
                        loadingMore: false
                    });
                    wx.hideNavigationBarLoading();
                }
            });
        }else {
            wx.navigateTo({
                url: '/pages/protocol/protocol?id=' + id + '&status=' + status + '&uid=' + uid + '&type=' + type + '&usertype=' + usertype + '&pcup_id=' + pcup_id
            });
        }
        

    },
    onListItemMoreTap(e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/protocol/protocol?id=' + id
        });
    },
    showSearchInput() {
        this.setData({
            searchInputShowed: true,
            searchingResult: false
        });
    },
    hideSearchInput() {
        this.setData({
            searchInputVal: "",
            searchKeyword: "",
            searchInputShowed: false,
            searchingResult: false
        });
        this.onPullDownRefresh();
    },
    clearSearchInput() {
        this.setData({
            searchInputVal: "",
            searchKeyword: "",
            searchingResult: false
        });
        this.onPullDownRefresh();
    },
    searchInputTyping(e) {
        this.setData({
            searchInputVal: e.detail.value,
            searchKeyword: "",
            searchingResult: false
        });
    },
    searchSubmit() {
        this.setData({
            searchingResult: true,
            searchKeyword: this.data.searchInputVal
        });
        this.onPullDownRefresh();
    },
    previewImage(e) {
        wx.previewImage({
            current: '', // 当前显示图片的http链接
            urls: [e.currentTarget.dataset.previewUrl] // 需要预览的图片http链接列表
        });

    },
    onShareAppMessage() {
        return {
            title: '好玩的,都在这儿~~',
            path: '/pages/index/index'
        }
    }

});
