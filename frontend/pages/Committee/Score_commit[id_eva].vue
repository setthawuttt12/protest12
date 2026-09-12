<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_commit === 'y'">
                    <h1 class="text-h5 font-wight-bold">คะแนนประเมินของกรรมการประเมิน</h1>
                    <v-card class="mt-3 pa-3" :elevation="5" rounded>
                        <p>ผู้ใช้งาน : {{ user.fname }} {{ user.lname }}</p>
                        <p>รอบการประเมิน : {{ user.round_sys }} ปี {{ user.year_sys }}</p>
                    </v-card>
                    <v-row v-for="(topic,t) in topics" :key="topic.id_topic" class="">
                        <v-col cols="12">
                            <h1 class="text-h5 font-wight-bold">{{ Number(t) + 1 }} {{ topic.name_topic }}</h1>
                            <v-table class="table">
                                <tr>
                                    <th class="bg-grey border pa-1" style="width: 10%;">ตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียดตัวชี้วัด</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">น้ำหนักคะแนน</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">คะแนนเต็ม</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">รายละเอียด</th>
                                    <th class="bg-grey border pa-1" style="width: 10%;">คะแนนที่ได้</th>
                                </tr>
                                <tr v-for="(indicate,i) in topic.indicates" :key="indicate.id_indicate">
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.name_indicate }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.detail_indicate || '-' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.point_indicate*4 }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.detail_eva || '-' }}</td>
                                    <td class="border pa-1 text-center" style="width: 10%;">{{ indicate.score_member*indicate.point_indicate }}</td>
                                </tr>
                            </v-table>
                        </v-col>
                        
                    </v-row>
                    <div class="mt-3 text-center">
                        <v-card color="success" class="text-end" type="submit">คะแนนรวม : {{ user.total_eva }} คะแนน</v-card>
                    </div>
                </v-form>
                <v-alert v-else-if="user.status_commit === 'n'" color="warning"">ยังไมได่้ประเมินตนเอง</v-alert>
                <v-alert v-else color="error"">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { eva,commit } from '~/API/base';

const user = ref<any>({})
const topics = ref<any>([])
const totalScore = ref(0)
const id_eva = useRoute().params.id_eva

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${commit}//user`,{headers:{Authorization:`Bearer ${token}`}})
        user.value = res.data
    } catch (error) {
        console.error('Error Get user',error)
    }
}
const fecthTopics = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${commit}/score_commit/topic`,{headers:{Authorization:`Bearer ${token}`}})
        topics.value = res.data
        res.data.forEach((s:any)=> s.indicate.forEach((i:any)=> totalScore.value += (i.score_commit*i.point_indicate)))
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