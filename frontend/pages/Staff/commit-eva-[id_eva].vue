<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="12">
                <v-card class="mb-3">
                    <v-card-title><h1 class="text-center">ผู้รับการประเมินผล</h1></v-card-title>
                    <v-card-text>
                        <p>ชื่อ-สกุล:{{ header.fname }} {{ header.lname }}</p>
                        <p>รอบการประเมินที่:{{ header.round_sys }} ปี:{{ header.year_sys }}</p>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        <h1 class="text-h5 text-center">เพิ่มกรรมการ</h1>
                    </v-card-title>
                    <v-card-text>
                        <br>
                        <v-form @submit.prevent="saveMember">
                            <v-row v-for="(c,index) in List" :key="index">
                                <v-col cols="12" md="6">
                                    <v-select :label="`กรรมการประเมินคนที่: ${index+1}`" v-model="c.id_member" prepend-inner-icon="mdi-account" :items="MEMBER(index).map((t)=>({title:`${t.fullname_commit}`,value:t.id_member}))"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select :label="`ตำแหน่งกรรมการคนที่: ${index+1}`" v-model="c.role" :items="ROLE(index)"></v-select>
                                </v-col>
                                
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <center>
                                        <v-btn class="text-center ma-3" color="primary" type="submit">บันทึก</v-btn>
                                        <v-btn class="text-center ma-3" color="error" type="reset">ยกเลิก</v-btn>
                                    </center>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table class="table mt-3">
                            <thead>
                                <tr>
                                    <th class="text-center border">ลำดับ</th>
                                    <th class="text-center border">กรรมการประเมิน</th>
                                    <th class="text-center border">ตำแหน่ง</th>
                                    <th class="text-center border">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(items,index) in List" :key="items.id_commit">
                                    <td class="text-center border">{{ index+1 }}</td>
                                    <td class="text-center border">{{ nameOf(items.id_member) }}</td>
                                    <td class="text-center border">{{ items.role }}</td>
                                    <td class="text-center border">
                                        <center>
                                
                                            <v-btn class="ma-3 text-center text-white" color="error" size="small" @click="del(items.id_commit)">ลบ</v-btn>
                                        </center>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { api, staff } from '~/API/base';

const error = ref<Record<string,string>>({})
const role = ['ประธาน','กรรมการ','เลขา']
const people = ref([])
const header = ref([])
const List = ref([
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''},
    {id_commit:null,id_member:'',role:''}
])
const token = import.meta.client ? localStorage.getItem('token'):null
const id_eva = useRoute().params.id_eva
const saveMember = async()=>{
    try {
        
        await axios.post(`${staff}/commit/save/${id_eva}`,List.value,{headers:{Authorization:`Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
    } catch (error) {
        console.error("Error save commit",error);
        
    }
}

const fetch = async()=>{
    try {
        
        const res = await axios.get(`${staff}/commit/header/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        header.value = res.data
        const res2 = await axios.get(`${staff}/commit/member/${id_eva}`,{headers:{Authorization:`Bearer ${token}`}})
        people.value = res2.data.pick
        const useData = res2.data.picked
        if(useData.length ===0){
            List.value = [
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''},
                {id_commit:null,id_member:'',role:''}
            ]
        }else{
            List.value = useData.map((c)=>(
                {id_commit:c.id_commit,id_member:c.id_member,role:c.role}
            ))

            while(List.value.length <3){
                List.value.push({id_commit:null,id_member:'',role:''})
            }
        }
        
        
    } catch (error) {
        console.error("error Get commit",error);
        
    }
}

const del = async(id_commit:number)=>{
    if(!confirm('ต้องการลบข้อมูลชุดนี้ใช่หรือไม่'))return
    try {
        
        await axios.delete(`${staff}/commit/delete/${id_commit}`,{headers:{Authorization:`Bearer ${token}`}})
        await fetch()

    } catch (error) {
        console.error("Error delete commit",error);
        
    }
}

const nameMap = computed(()=> Object.fromEntries(people.value.map((p)=>[p.id_member,p.fullname_commit])))
const nameOf = (id:number)=> nameMap.value[id]

const MEMBER = (idx:number)=>{
    const picked = List.value.map((c,i)=>(i !== idx ? c.id_member :null))
    return people.value.filter((p)=>!picked.includes(p.id_member))
}

const ROLE = (idx:number)=>{
    const picked = List.value.map((c,i)=>(i !== idx ? c.role :null))
    return role.filter((p)=>!picked.includes(p))
}

onMounted(fetch)

</script>

<style scoped>

</style>