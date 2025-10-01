<script setup lang="ts">
import { onMounted, ref } from "vue";
import TextInput from "./form/TextInput.vue";
import { computed } from "@vue/reactivity";
import { supabase } from "../lib/supabaseClient";
import DropdownInput from "./form/DropdownInput.vue";

// const sampleRecords = [
//   {
//     id: "USR001",
//     created_at: "2025-09-15T10:23:00Z",
//     full_name: "Emily Johnson",
//     gender: "Female",
//     date_of_birth: "2007-03-12",
//     age: "18",
//     role: "Participant",
//     nationality: "American",
//     id_number: "A123456789",
//     parent_email: "susan.johnson@example.com",
//     email: "emily.johnson@example.com",
//     phone_number: "+1-555-324-9876",
//     emergency_name: "Michael Johnson",
//     emergency_number: "+1-555-201-4433",
//     church_name: "Grace Community Church",
//     church_code: "GCC-102",
//     youth_leader: "Pastor Daniel Smith",
//     youth_number: "+1-555-765-3344",
//     leader_email: "daniel.smith@gcc.org",
//     shirt_size: "M",
//     graduating: "Yes",
//     launch_conf: "Yes",
//     swimming: "Yes",
//     allergies: "No",
//     allergies_info: "",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "Yes",
//     bw_25_shirt_size: "M",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR002",
//     created_at: "2025-09-16T14:55:30Z",
//     full_name: "Joshua Martinez",
//     gender: "Male",
//     date_of_birth: "2008-11-25",
//     age: "16",
//     role: "Participant",
//     nationality: "Mexican",
//     id_number: "MEX9023345",
//     parent_email: "luis.martinez@example.com",
//     email: "joshua.martinez@example.com",
//     phone_number: "+52-55-8723-1144",
//     emergency_name: "Laura Martinez",
//     emergency_number: "+52-55-8723-2290",
//     church_name: "Iglesia Nueva Vida",
//     church_code: "INV-210",
//     youth_leader: "Maria Lopez",
//     youth_number: "+52-55-8723-1188",
//     leader_email: "maria.lopez@inv.org",
//     shirt_size: "L",
//     graduating: "No",
//     launch_conf: "Yes",
//     swimming: "No",
//     allergies: "Yes",
//     allergies_info: "Peanuts",
//     medication: "Yes",
//     medication_info: "Asthma inhaler",
//     eyu_cap: "No",
//     bw_25_shirt: "Yes",
//     bw_25_shirt_size: "L",
//     online_payment: "No",
//     acknowledgement: "Yes",
//     paid: false,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
//   {
//     id: "USR003",
//     created_at: "2025-09-17T09:10:45Z",
//     full_name: "Sophia Kim",
//     gender: "Female",
//     date_of_birth: "2006-07-05",
//     age: "19",
//     role: "Leader",
//     nationality: "South Korean",
//     id_number: "KR200678912",
//     parent_email: "min.park@example.com",
//     email: "sophia.kim@example.com",
//     phone_number: "+82-10-4432-7788",
//     emergency_name: "Min Park",
//     emergency_number: "+82-10-4422-1199",
//     church_name: "Seoul Central Church",
//     church_code: "SCC-555",
//     youth_leader: "Rev. Han Lee",
//     youth_number: "+82-10-5533-2211",
//     leader_email: "han.lee@scc.org",
//     shirt_size: "S",
//     graduating: "Yes",
//     launch_conf: "No",
//     swimming: "Yes",
//     allergies: "Yes",
//     allergies_info: "Seafood",
//     medication: "No",
//     medication_info: "",
//     eyu_cap: "Yes",
//     bw_25_shirt: "No",
//     bw_25_shirt_size: "",
//     online_payment: "Yes",
//     acknowledgement: "Yes",
//     paid: true,
//   },
// ];

const username = "arnoiscool";
const password = "coolisarno";

const currentChurch = ref<string>("YFC");
const roleFilter = ref<"All" | "Leader" | "Student">("All");
const churchFilter = ref<string>("All");

const userSelected = ref<boolean>(false);
const selectedUser = ref<{}>();
const loggedIn = ref<boolean>(true);
const inputUsername = ref<string>();
const inputPassword = ref<string>();
const rows = ref([
  {
    id: "",
    created_at: "",
    full_name: "",
    gender: "",
    date_of_birth: "",
    age: "",
    role: "",
    nationality: "",
    id_number: "",
    parent_email: "",
    email: "",
    phone_number: "",
    emergency_name: "",
    emergency_number: "",
    church_name: "",
    church_code: "",
    youth_leader: "",
    youth_number: "",
    leader_email: "",
    shirt_size: "",
    graduating: "",
    launch_conf: "",
    swimming: "",
    allergies: false,
    allergies_info: "",
    medication: false,
    medication_info: "",
    eyu_cap: "",
    bw_25_shirt: "",
    bw_25_shirt_size: "",
    online_payment: "",
    acknowledgement: "",
    paid: false,
  },
]);

const searchText = ref<string>("");
const church_names = ref<any>();
const churches = ref<any>();

const filteredRows = computed(() => {
  return rows.value
    .filter((row) => {
      if (
        churchFilter.value.toLowerCase() != "all" &&
        churchFilter.value.toLowerCase() != row.church_name.toLowerCase()
      )
        return false;
      if (
        roleFilter.value.toLowerCase() != "all" &&
        (roleFilter.value.toLowerCase() == "leader"
          ? row.role != "leader"
          : row.role == "leader")
      )
        return false;
      return row.full_name
        .toLowerCase()
        .includes(searchText.value.toLowerCase());
    })
    .sort((a, b) => {
      return a.full_name.localeCompare(b.full_name);
    });
});

async function checkLogIn() {
  if (
    loggedIn.value == true ||
    (inputUsername.value == username && inputPassword.value == password)
  ) {
    loggedIn.value = true;

    // let data = await fetch("/api/public", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const userData = await data.json();
    // if (userData) rows.value = userData;

    let { data, error } = await supabase
      .from("registrations-25")
      .select("*")
      .order("created_at");

    if (error) console.log(error);
    if (data) rows.value = data;

    const counts: Record<
      string,
      { signups: number; paidSignups: number; nonPaying: number }
    > = {};

    rows.value.forEach((row) => {
      if (row["church_name"]) {
        if (counts[row["church_name"].toString()])
          counts[row["church_name"].toString()] = {
            signups: counts[row["church_name"].toString()]["signups"] + 1,
            paidSignups:
              counts[row["church_name"].toString()]["paidSignups"] +
              (row["paid"] ? 1 : 0),
            nonPaying:
              counts[row["church_name"].toString()]["nonPaying"] +
              (!row["online_payment"] ? 1 : 0),
          };
        else
          counts[row["church_name"].toString()] = {
            signups: 1,
            paidSignups: row["paid"] ? 1 : 0,
            nonPaying: row["online_payment"] ? 0 : 1,
          };
      }
      if (counts["All"])
        counts["All"] = {
          signups: counts["All"]["signups"] + 1,
          paidSignups: counts["All"]["paidSignups"] + (row["paid"] ? 1 : 0),
          nonPaying:
            counts["All"]["nonPaying"] + (!row["online_payment"] ? 1 : 0),
        };
      else
        counts["All"] = {
          signups: 1,
          paidSignups: row["paid"] ? 1 : 0,
          nonPaying: !row["online_payment"] ? 1 : 0,
        };
    });

    church_names.value = Object.entries(counts).map(([name, info]) => ({
      name,
      info,
    }));

    churches.value = church_names.value.map((item: any) => item.name).sort();
  }
}

function chooseUser(user: object) {
  selectedUser.value = user;
  console.log(user);
  userSelected.value = true;
}

function unchooseUser() {
  userSelected.value = false;
}

onMounted(() => {
  checkLogIn();
});
</script>

<template>
  <div
    v-if="!loggedIn"
    class="flex flex-col gap-4 justify-center items-center h-dvh w-full"
  >
    <div class="w-1/2 min-w-72 flex flex-col gap-4 rounded-lg border py-4">
      <h1 class="text-3xl font-semibold">Big Weekend Admin Panel</h1>
      <div class="flex flex-col w-full justify-center items-center gap-4">
        <TextInput
          v-model="inputUsername"
          :title="'Username'"
          :placeholder="'-----'"
        />
        <TextInput
          v-model="inputPassword"
          :title="'Password'"
          :placeholder="'-----'"
        />
        <button
          @click="checkLogIn"
          class="px-4 pb-2 pt-3 rounded-lg bg-secondary text-white"
        >
          LOG IN
        </button>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-center bg-gray-200">
    <div class="flex flex-col items-start w-10/12 gap-4 p-2" v-if="loggedIn">
      <div class="w-full rounded-lg p-4">
        <div class="py-2 w-full flex justify-between items-center">
          <h1 class="text-xl font-bold">Admin Panel</h1>
        </div>
        <div class="w-full flex gap-2 mb-4">
          <TextInput
            v-model="searchText"
            :extraCss="'border-neutral-500 bg-neutral-100'"
            :title="'Search by Name'"
            :placeholder="'Search...'"
          ></TextInput>
          <DropdownInput
            v-model="roleFilter"
            :extraCss="'border-neutral-500 bg-neutral-100'"
            :title="'Choose Role'"
            :placeholder="'All'"
            :options="['All', 'Leader', 'Student']"
          ></DropdownInput>
          <DropdownInput
            v-model="churchFilter"
            :extraCss="'border-neutral-500 bg-neutral-100'"
            :title="'Choose Church'"
            :placeholder="'Choose Church'"
            :options="churches"
            :disabled="currentChurch != 'YFC'"
          ></DropdownInput>
        </div>
      </div>
      <!-- <div class="w-full h-[1px] bg-black"></div> -->
      <div class="w-full grid lg:grid-cols-2 grid-cols-1 gap-4 h-full p-4">
        <div v-for="record in filteredRows">
          <div
            class="bg-gray-100 border border-neutral-500 shadow-lg rounded flex flex-col items-start gap-2 p-2 hover:scale-[101%] transition-all"
          >
            <div class="flex lg:flex-row flex-col gap-2 w-full">
              <div class="text-left flex flex-col items-start grow">
                <p class="font-bold">{{ record.full_name }}</p>
                <p>{{ record.church_name }}</p>
              </div>
              <p
                class="rounded p-2 h-fit pt-3 font-semibold text-white bg-red-900"
                v-if="record.role === 'leader'"
              >
                LEADER
              </p>
              <p
                class="rounded p-2 h-fit pt-3 font-semibold text-white"
                :class="
                  record.gender === 'female' ? 'bg-pink-700' : 'bg-blue-700'
                "
              >
                {{ record.age }} {{ record.gender.charAt(0).toUpperCase() }}
              </p>
            </div>
            <div class="w-full bg-black h-[1px]"></div>
            <div
              class="w-full flex lg:flex-row flex-col justify-between items-end gap-2"
            >
              <div class="w-full text-left">
                <p>
                  Phone Number:
                  <a
                    :href="`tel${record.phone_number}`"
                    class="underline font-semibold text-blue-700"
                    >{{ record.phone_number }}
                    <ion-icon name="call"></ion-icon>
                  </a>
                </p>
                <p>
                  Email Address:
                  <a
                    :href="`mailto:${record.email}`"
                    class="underline font-semibold text-blue-700"
                    >{{ record.email }}
                    <ion-icon name="mail"></ion-icon>
                  </a>
                </p>
                <p>
                  Parent Email Address:
                  <span class="font-semibold"
                    >{{ record.parent_email ?? "---" }}
                  </span>
                </p>
                <p>
                  Medication Information:
                  <span class="font-semibold"
                    >{{ record.medication ? record.medication_info : "None" }}
                  </span>
                </p>
                <p>
                  Allergy Information:
                  <span class="font-semibold"
                    >{{ record.allergies ? record.allergies_info : "None" }}
                  </span>
                </p>
                <p>
                  Swimming:
                  <span class="font-semibold"
                    >{{ record.swimming === "Yes" ? "Allowed" : "Not Allowed" }}
                  </span>
                </p>
                <p>
                  Emergency Contact:
                  <span class="font-semibold"
                    >{{ record.emergency_name }}
                  </span>
                </p>
                <p>
                  Emergency Number:
                  <span class="font-semibold"
                    >{{ record.emergency_number }}
                  </span>
                </p>
              </div>
              <!-- @click="chooseUser(record)" -->
              <button
                class="h-fit w-fit not-lg:w-full p-2 rounded border hover:scale-105 transition-all cursor-not-allowed opacity-50 bg-neutral-600 text-white hover:bg-red-900 font-semibold"
              >
                View Full Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full h-dvh absolute flex justify-end backdrop-blur-lg backdrop-brightness-75 transition-all overflow-hidden"
      :class="userSelected ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <div
        class="rounded bg-white w-1/3 min-w-72 h-full p-4 flex flex-col transition-all"
        :class="userSelected ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex items-center gap-2">
          <button
            @click="unchooseUser"
            class="pt-2 hover:scale-110 transition-all cursor-pointer"
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <p>User Details</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
