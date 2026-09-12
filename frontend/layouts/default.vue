<template>
    <v-app>
        <v-app-bar :color="bg(user.role)" flat rounded elevation="5">
            <v-app-bar-nav-icon @click="drawer = !drawer" />
            <v-toolbar-title>NTC EVALUATION SYSTEM</v-toolbar-title>
            <v-spacer/>

            <p class="text-center">ผู้ใช้งาน : {{ user.fname }} {{ user.lname }} <br> {{ user.role }} </p>
            <v-btn variant="text" @click="logout" icon="mdi-logout" />
        </v-app-bar>

        <client-only>
            <v-navigation-drawer v-model="drawer" app width="260" color="#404040" :temporary="isMobile" :permanent="!isMobile">
                <v-list density="comfortable">
                    <v-list-item v-for="item in navitem" :key="item.title" :to="item.to">
                        {{ item.title }}
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </client-only>

        <v-main>
            <v-container>
                <slot/>
            </v-container>
            <v-footer class="text-center justify-center text-caption">©NTC EVALUATION SYSTEM</v-footer>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import axios  from 'axios'
import { ClickOutside } from 'vuetify/directives';
import { useDisplay } from 'vuetify/lib/composables/display.mjs';
import { api } from '~/API/base'; 

const {mdAndDown} = useDisplay()
const isMobile = computed(()=> mdAndDown.value)
const drawer = ref(false)
const user = ref<any>({})

const logout = ()=>{
    if(!confirm('ท่านต้องการออกจากระบบใช่หรือไม่'))return
    localStorage.removeItem('token')
    navigateTo('/',{replace:true})
    window.location.reload()
}

const navitem = computed(()=> roles.filter((item)=> item.role.includes(user.value.role)))

const roles = [
    {title:'หน้าหลัก',to:'/Staff/',role:'ฝ่ายบุคลากร'},
    {title:'จัดการผู้รับการประเมินผล',to:'/Staff/Manage_eva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการกรรมการประเมิน',to:'/Staff/Manage_commit',role:'ฝ่ายบุคลากร'},
    {title:'จัดการหัวข้อการประเมิน',to:'/Staff/Topic',role:'ฝ่ายบุคลากร'},
    {title:'จัดการตัวชี้วัด',to:'/Staff/Indicate',role:'ฝ่ายบุคลากร'},
    {title:'จัดการรอบการประเมิมน',to:'/Staff/Round_eva',role:'ฝ่ายบุคลากร'},
    {title:'จัดการแบบประเมิน',to:'/Staff/Eva',role:'ฝ่ายบุคลากร'},
    {title:'ผลการประเมินของผู้รับการประเมินผล',to:'/Staff/Score_evaList',role:'ฝ่ายบุคลากร'},
    {title:'ผลการประเมินของกรรมการประเมินผล',to:'/Staff/Score_CommitList',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินผู้รับการประเมินผล',to:'/Staff/Status_eva',role:'ฝ่ายบุคลากร'},
    {title:'สถานะการประเมินกรรมการประเมินผล',to:'/Staff/Status_commit',role:'ฝ่ายบุคลากร'},
    {title:'เอกสารหรือคู่มือการประเมิน',to:'/Staff/Document',role:'ฝ่ายบุคลากร'},
    {title:'รายงาน',to:'/Staff/Report',role:'ฝ่ายบุคลากร'},

    //eva 
    {title:'หน้าหลัก',to:'/Evaluatee/',role:'ผู้รับการประเมินผล'},
    {title:'แก้ไขข้อมูลส่วนตัว',to:'/Evaluatee/edit_eva',role:'ผู้รับการประเมินผล'},
    {title:'แบบประเมินตนเอง',to:'/Evaluatee/selfeva',role:'ผู้รับการประเมินผล'},
    {title:'ผลการประเมิน',to:'/Evaluatee/check_score',role:'ผู้รับการประเมินผล'},
    {title:'รายงาน',to:'/Evaluatee/Report_eva',role:'ผู้รับการประเมินผล'},
    {title:'คู่มือการประเมิน',to:'/Evaluatee/Doc',role:'ผู้รับการประเมินผล'},


    //commit

    {title:'รายชื่อผู้รับการประเมินผล',to:'/Committee',role:'กรรมการประเมิน'},
    {title:'ดำเนินการประเมิน',to:'/Committee/Show_eva',role:'กรรมการประเมิน'},
    {title:'ตรวจสอบผลและยืนยัน',to:'/Committee/Check_confirm',role:'กรรมการประเมิน'},
    {title:'คู่มือการประเมิน',to:'/Committee/Doc',role:'กรรมการประเมิน'},
]

const fecth = async()=>{
    const token = localStorage.getItem('token')
    if(!token){
        return navigateTo('/',{replace:true})
    }
    try {
        const res = axios.get(`${api}/profile`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = (await res).data
    } catch (error) {
        console.error('Error Get User',error)
    }
}

onMounted(fecth)
const bg = (role)=>{
    if(role === 'ฝ่ายบุคลากร')return '#687647'
    if(role === 'กรรมการประเมิน')return '#007FFF'
    if(role === 'ผู้รับการประเมินผล')return '#7d0c14'
}

</script>

<style scoped>
@media print{
    .v-btn.no-p,.v-app-bar{
        margin: 0 !important;
        margin-top: 0 !important;
        padding: 0 !important;
        display: 0 !important;
        width: 100% !important;
    }
}

</style>