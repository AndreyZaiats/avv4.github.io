<template>
    <section>
        <div class="mobile_header">
            <a class="mobile_header__a" href="#" @click="toggleMenu"><img src="/img/menu.png" alt="png">МЕНЮ</a>
        </div>
        <div class="container">
            <div class="row">
                <div :class="[sidebarActive ? 'sidebar-active': '', 'sidebar']">
                    <div class="sidebar__video">
                        <div class="item_header">
                            <h6><img src="/img/video.png" alt=""> ВІДЕО</h6>
                            <img src="/img/arrow_down.png" alt="png">
                        </div>
                        <div class="sv_body">
                            <form action="">
                                <div class="form-group">
                                    <input type="checkbox" v-model="filterCategoryKeys" value="sales" name="sales" id="sales">
                                    <label for="sales"><span></span> Акція ({{ countSales }})</label>
                                </div>
                                 <div class="form-group">
                                    <input type="checkbox" v-model="filterCategoryKeys" value="popular" name="popular" id="popular">
                                    <label for="popular"><span></span> Популярнi ({{ countPopular }})</label>
                                </div>
                                 <div class="form-group">
                                    <input type="checkbox" v-model="filterCategoryKeys" value="novelty" name="novelty" id="novelty">
                                    <label for="novelty"><span></span> Новинки</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="sidebar__themes">
                        <div class="item_header">
                            <h6><img src="/img/list2.png" alt=""> ТЕМИ</h6>
                            <img src="/img/arrow_down.png" alt="png">
                        </div>
                        <div class="st_body">
                            <form action="" name="form_themes">
                                <div class="form-group">
                                    <input v-model="themeChecked" value="all" type="radio" name="radio_theme" id="theme_all">
                                    <label for="theme_all">Всі теми ({{ allThemesCount }})</label>
                                </div>
                                <div class="form-group" v-for="(item,index) in uniqThemes" :key="index">
                                    <input v-model="themeChecked" :value="item.theme" type="radio" name="radio_theme" :id="item.theme">
                                    <label :for="item.theme">{{ item.rus }} ({{ item.count }})</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="content__header">
                        <h2>{{ mainCaptionRus }}</h2>
                        <hr>
                        <div class="header_right">
                            <form action="" v-on:submit.prevent>
                                <div class="form-group">
                                    <a href="#"><img src="/img/search.png" alt="png"></a>
                                    <input type="text" v-model="search" name="search" id="search">
                                </div>
                            </form>
                            <div class="grids">
                                <a href="#" @click="setView('grid')"><img src="/img/grid.png" alt="png"></a>
                                <a href="#" @click="setView('list')"><img src="/img/list.png" alt="png"></a>
                            </div>

                        </div>
                    </div>
                    <div :class="[setViewKey=='list' ? 'content__body--list' : '', 'content__body' ]">
                        <div :class="[ videosData != 0 ? 'd-none' : '', 'content__clear']">
                            <p class="mt-5 text-center">За заданими критеріями пошуку нічого не знайдено</p>
                        </div>
                        <div class="content__item" v-for="video in videosData" :key="video.id">
                            <div class="item_img" :style="{ 'background-image': 'url(' + video.covers.main +')' }"></div>
                            <div class="item_text">
                                <p v-html="video.title"></p>
                                <a :href="video.options.link" :class="[ video.access ? 'button_secondary' : 'button_main' ]">{{ video.access ? 'Дивитися' : 'Придбати' }}<div><img src="/img/right_arrow.png"
                                        alt=""></div></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>




<script>

let jsonData = require('../data.json');


export default {
    data() {
        return {
            sidebarActive: false,
            allThemesCount: '',
            mainCaptionRus: 'Всі теми',
            themeChecked: {},
            themeCheckedKey: 'all',
            filterCategoryKeys: [],
            videos: [],
            search: '',
            setViewKey: '',
        }
    },

    computed: {
        videosData: function () {

            var filtered = this.videos
                //Фильтр по темам
                .filter((video)=>{
                    if (this.themeCheckedKey == 'all') {
                        return true;
                    }
                    return video.theme == this.themeCheckedKey
                })

                //Фильтр по акциям
                .filter((video)=>{
                    if (this.filterCategoryKeys.length!=0) {
                        if (this.filterCategoryKeys.indexOf( 'sales' ) != -1) {
                            return video.options.sale
                        }
                        else { return true }
                    }
                    else { return true; }
                })

                //Фильтр по популярности
                .filter((video)=>{
                    if (this.filterCategoryKeys.length!=0) {
                        if (this.filterCategoryKeys.indexOf( 'popular' ) != -1) {
                            return video.options.popular
                        }
                        else { return true }
                    }
                    else { return true; }
                })

                //Фильтр по новинкам
                .sort((a,b)=>{
                    if (this.filterCategoryKeys.length!=0) {
                        if (this.filterCategoryKeys.indexOf( 'novelty' ) != -1) {
                            var c = new Date(a.date);
                            var d = new Date(b.date);
                            return d-c;
                        }
                        else { return true }
                    }
                    else { return true; }
                })

                //Поиск
                .filter(video => {
                    return this.search == '' || video.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
                });
            return filtered
        },
        uniqThemes: function() {
            return this.videos.map((x) => x.theme).reduce((r, с) => [...new Set(r.concat(с))], [])
            .map((с) => {
                var r;
                if (с == 'business_trips') {
                    r = 'Відрядження';
                }
                else if (с == 'currency') {
                    r = 'Валюта';
                }
                else if (с == 'production') {
                    r = 'Виробництво і собівартість';
                }
                else if (с == 'vacation') {
                    r = 'Відпустки';
                }
                else if (с == 'excise_tax') {
                    r = 'Акцизний податок';
                }

                return {
                    'theme': с,
                    'rus': r,
                    'count': this.videos.filter(cx => cx.theme === с).length
                }
            })
        },
        countPopular: function () {
            return this.videos.filter(video => video.options.popular).length
        },
        countSales: function () {
            return this.videos.filter(video => video.options.sale).length
        }
    },

    watch: {
        themeChecked: function (oldValue) {
            var i = 0;
            for (let k in this.uniqThemes) {
                if (this.uniqThemes[k].theme == oldValue) {
                    this.mainCaptionRus = this.uniqThemes[k].rus;
                    i++;
                } else if (i==0) {
                    this.mainCaptionRus = 'Всі теми';
                }
            }
            this.themeCheckedKey = oldValue;   
        },
        
    },

    created() {
        this.videos=jsonData;       
        this.allThemesCount = this.videos.length;

        let v = document.cookie.match('(^|;) ?' + 'contentView' + '=([^;]*)(;|$)');
        this.setViewKey  = v ? v[2] : 'grid';
       
        document.addEventListener('click', this.clickOutsideMenu);
        this.$on('hook:beforeDestroy', () => document.removeEventListener('click', this.clickOutsideMenu));
    },
    
    methods: {
        toggleMenu: function () {
            this.sidebarActive = !this.sidebarActive;
        },
        clickOutsideMenu: function (e) {
            let inside = document.getElementsByClassName('sidebar')[0].contains(e.target);
            let inside2 = document.getElementsByClassName('mobile_header__a')[0].contains(e.target);
            if (!inside && !inside2) {
                this.sidebarActive = false
            }
        },
        setView: function (val) {
            this.setViewKey = val;
            this.setCookie('contentView', this.setViewKey, 7)
        },
        setCookie(name, value, days) {
            var d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*days);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        },
    }
}
</script>


