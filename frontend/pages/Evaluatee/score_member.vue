<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-wight-bold">ผลการประเมินของผู้รับการประเมินผล</h1>
                    <v-card class="mt-3 pa-3" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic" class="">
                        <v-col cols="12">
                            <h1 class="text-h5 font-wight-bold">{{ Number(t) + 1 }} {{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey border pa-1" style="width: 100%;">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 100%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 100%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-1" style="width: 100%;">คะแนนเต็ม</th>
                                    <th class="bg-grey border pa-1" style="width: 100%;">รายละเอียด</th>
                                    <th class="bg-grey border pa-1" style="width: 100%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.name_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.detail_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.point_indicate }}</td>
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.detail_eva || '-' }}</td>
                                    <td class="boder pa-1 text-center" style="width: 100%;">{{ indicate.score_member*indicate.point_indicate }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                        
                    </v-row>
                    <div class="mt-3 text-center">
                        <v-btn color="success" type="submit">คะแนนรวม : {{ user.total_eva }} คะแนน</v-btn>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_eva === 2 || user.status_eva === 3" color="success"">ประเมินสำเร็จ</v-alert>
                <v-alert v-else color="error"">ยังไม่ได้ประเมินตนเอง</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { eva } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fecthTopics = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/selfeva/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
  




onMounted(async()=>{
    await Promise.all([fecth(),fecthTopics()])
})


</script>

<style scoped>

</style>