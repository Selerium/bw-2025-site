<script setup lang="ts">
import { ref } from "vue";
import Nav from "./Nav.vue";
import TextInput from "./form/TextInput.vue";
import DropdownInput from "./form/DropdownInput.vue";
import DateInput from "./form/DateInput.vue";
import CheckboxInput from "./form/CheckboxInput.vue";
import NumberInput from "./form/NumberInput.vue";

// const registrationOpen = false;
const activeImage = ref<number>(1);

// form fields
const fullName = ref<string>();
const gender = ref<string>();
const dateOfBirth = ref<Date>();
const age = ref<number>();
const nationality = ref<string>();
const idNumber = ref<string>();
const emailAddress = ref<string>();
const phoneNumber = ref<string>();
const emergencyName = ref<string>();
const emergencyNumber = ref<string>();
const role = ref<string>();
const churchName = ref<string>();
const churchCode = ref<string>();
const leaderName = ref<string>();
const leaderNumber = ref<string>();
const size = ref<string>();
const swimming = ref<string>();
const allergies = ref<boolean>();
const allergiesInfo = ref<string>();
const medication = ref<boolean>();
const medicationInfo = ref<string>();
const graduating = ref<boolean>();
const launchConf = ref<boolean>();
const eyuCap = ref<boolean>();
const bw25LimitedShirt = ref<boolean>();
const bw25LimitedShirtSize = ref<string>();
const onlinePayment = ref<boolean>();

const errorText = ref();

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua & Deps",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Rep",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo {Democratic Rep}",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea North",
  "Korea South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "St Kitts & Nevis",
  "St Lucia",
  "Saint Vincent & the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const images = [
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
  "hero-image.png",
];

const metrics = [
  {
    value: "350+",
    text: "PARTICIPANTS AND VOLUNTEERS",
  },
  {
    value: "20+",
    text: "CONNECTED CHURCHES",
  },
  {
    value: "4",
    text: "MAIN SESSIONS",
  },
  {
    value: "35+",
    text: "REPRESENTED NATIONALITIES",
  },
];

function changeActiveImage(left: boolean) {
  if (left)
    activeImage.value =
      activeImage.value == 1 ? images.length - 1 : activeImage.value - 1;
  else
    activeImage.value =
      activeImage.value == images.length - 1 ? 1 : activeImage.value + 1;
}

async function handleSubmit() {
  console.log(fullName.value);
  console.log(gender.value);
  console.log(dateOfBirth.value);
  console.log(age.value);
  console.log(nationality.value);
  console.log(idNumber.value);
  console.log(emailAddress.value);
  console.log(phoneNumber.value);
  console.log(emergencyName.value);
  console.log(emergencyNumber.value);
  console.log(role.value);
  console.log(churchName.value);
  console.log(churchCode.value);
  console.log(leaderName.value);
  console.log(leaderNumber.value);
  console.log(size.value);
  console.log(swimming.value);
  console.log(allergies.value);
  console.log(allergiesInfo.value);
  console.log(medication.value);
  console.log(medicationInfo.value);
  console.log(graduating.value);
  console.log(launchConf.value);
  console.log(eyuCap.value);
  console.log(bw25LimitedShirt.value);
  console.log(onlinePayment.value);

  if (fullName.value == undefined) errorText.value = "Please enter full name";
  else if (gender.value == undefined) errorText.value = "Please choose gender";
  else if (dateOfBirth.value == undefined)
    errorText.value = "Please enter date of birth";
  else if (age.value == undefined) errorText.value = "Please enter age";
  else if (nationality.value == undefined)
    errorText.value = "Please enter nationality";
  else if (idNumber.value == undefined)
    errorText.value = "Please enter ID number ";
  else if (emailAddress.value == undefined)
    errorText.value = "Please enter email";
  else if (phoneNumber.value == undefined)
    errorText.value = "Please enter phone number";
  else if (emergencyName.value == undefined)
    errorText.value = "Please enter emergency contact name";
  else if (emergencyNumber.value == undefined)
    errorText.value = "Please enter emergency contact number";
  else if (role.value == undefined)
    errorText.value = "Please choose your role at BW2025";
  else if (churchName.value == undefined)
    errorText.value = "Please enter your church name";
  else if (churchCode.value == undefined)
    errorText.value = "Please enter your church code";
  else if (leaderName.value == undefined)
    errorText.value = "Please enter your leader's name";
  else if (leaderNumber.value == undefined)
    errorText.value = "Please enter your leader's contact number";
  else if (size.value == undefined)
    errorText.value = "Please choose your shirt size";
  else if (swimming.value == undefined)
    errorText.value = "Please choose your swimming proficiency";
  else if (allergies.value == undefined)
    errorText.value = "Please mention if you have allergies";
  else if (allergiesInfo.value == undefined)
    errorText.value = "Please mention your allergy information";
  else if (medication.value == undefined)
    errorText.value = "Please mention if you have medication";
  else if (medicationInfo.value == undefined)
    errorText.value = "Please mention your medication information";
  else if (graduating.value == undefined)
    errorText.value = "Please mention if you are graduating";
  else if (launchConf.value == undefined)
    errorText.value = "Please mention your interest in Launch Conference 2025";
  else if (onlinePayment.value == undefined)
    errorText.value = "Please pick a payment method";
  else errorText.value = "";

  const res = await fetch(
    "https://afqmzmqsvbxdyxuqhwfv.supabase.co/functions/v1/register-user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName.value,
        gender: gender.value,
        date_of_birth: dateOfBirth.value,
        age: age.value,
        nationality: nationality.value,
        id_number: idNumber.value,
        email: emailAddress.value,
        phone_number: phoneNumber.value,
        emergency_name: emergencyName.value,
        emergency_number: emergencyNumber.value,
        role: role.value,
        church_name: churchName.value,
        church_code: churchCode.value,
        youth_leader: leaderName.value,
        youth_number: leaderNumber.value,
        shirt_size: size.value,
        swimming: swimming.value,
        allergies: allergies.value,
        allergies_info: allergiesInfo.value,
        medication: medication.value,
        medication_info: medicationInfo.value,
        graduating: graduating.value,
        launch_conf: launchConf.value,
        eyu_cap: eyuCap.value,
        "bw-25-shirt": bw25LimitedShirt.value,
        "bw-25-shirt-size": bw25LimitedShirtSize.value,
        online_payment: onlinePayment.value,
        acknowledgement: true,
      }),
    }
  );
  const data = await res.json();
  console.log(data);
}
</script>

<template>
  <Nav class="fixed z-10 w-11/12" />
  <div
    id="home"
    class="flex flex-col h-dvh w-full justify-center items-center relative gap-10"
  >
    <img
      class="w-full h-full object-cover absolute z-0"
      src="/hero-image.png"
    />
    <div class="flex flex-col gap-4">
      <h1 class="z-10 text-white font-bold text-5xl">BIG WEEKEND 2025</h1>
      <p class="z-10 text-white text-lg">October 17-19, 2025</p>
    </div>
    <a
      href="#signup"
      class="z-10 font-bold text-white text-lg pt-2 pb-1 px-4 border-2 rounded-lg border-white bg-primary hover:scale-105 transition-all"
    >
      APPLY NOW
    </a>
    <a href="#about" class="absolute z-10 bottom-16"
      ><img src="/arrow.png" class="h-6 w-auto hover:scale-105 transition-all"
    /></a>
  </div>

  <div
    id="about"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <div class="flex justify-between w-11/12 max-h-1/3 gap-10 grow">
      <div class="flex flex-col gap-8 w-1/3 grow">
        <h1 class="text-5xl font-bold text-primary w-full text-left">
          WHAT IS BIG WEEKEND?
        </h1>
        <p class="text-md text-justify w-full leading-12">
          Big Weekend is an event for 12-18 year old students. It consists of 2
          nights and three days of worship, fun & games, small group
          discussions, and four teaching sessions designed to support spiritual
          growth for teenagers in the Gulf region. It is an opportunity to meet
          other young people from our region and make new friends. Participants
          represent different cultural and church backgrounds.
        </p>
      </div>
      <div
        class="relative flex flex-col justify-center items-center w-1/3 grow rounded-lg"
      >
        <img
          class="object-cover w-full h-full rounded-lg"
          :src="images[activeImage]"
        />
        <button @click="changeActiveImage(true)">
          <img
            class="rotate-90 cursor-pointer absolute z-10 bottom-5/12 -left-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
        <button @click="changeActiveImage(false)">
          <img
            class="-rotate-90 cursor-pointer absolute z-10 bottom-5/12 -right-4 mix-blend-difference"
            src="/arrow.png"
          />
        </button>
      </div>
    </div>
    <div class="flex gap-10 w-11/12 max-h-1/5 grow">
      <div
        v-for="item in metrics"
        class="w-1/5 h-full rounded-lg p-4 grow bg-secondary flex flex-col justify-center items-center gap-4"
      >
        <span class="text-white font-bold text-5xl">{{ item.value }}</span>
        <div class="h-1/3 w-full flex items-center justify-center">
          <span class="text-white text-lg">{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>

  <div
    id="theme"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <img src="/theme-logo.png" class="min-w-72 h-auto max-w-2/5" />
    <p class="text-center w-3/5">
      How do you know what is real? Sometimes knowing the difference between
      what is real and what is fake is difficult unless you are familiar with
      the real thing. Looking at a designer bag and a well made copy of it can
      fool you if you don’t know what the real thing really is like. Or looking
      at a photo evidence of something that has happened. How do you know that
      this is not an AI generated photo but the real thing? For a long time
      apostle Paul was living a life that was being influenced by something that
      looked real but was in fact fake. It wasn’t until he met the real person
      of Jesus that he learned that what he thought was real was in fact fake.
      Meeting the real thing changed his life forever. This year at Big Weekend
      we will dive into Philippians chapter 3 to see what it is to be 4REAL.
    </p>
    <div class="flex justify-between w-11/12">
      <img class="h-full w-auto" src="/verse-of-the-theme.png" />
      <iframe
        class="aspect-video rounded-lg"
        src="https://www.youtube.com/embed/MkhsM8vQ1PA?si=P-CydsPiygdHj9-G&amp;controls=0"
        title="Welcome to Big Weekend 2025"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <img class="h-full w-auto" src="/4real-logos.png" />
    </div>
  </div>

  <div
    id="speakers"
    class="flex flex-col h-dvh w-full justify-center items-center gap-10"
  >
    <h1 class="text-5xl font-bold text-primary w-full text-center">
      MEET THE SPEAKERS
    </h1>
    <div class="flex flex-wrap justify-center items-center w-11/12">
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">ARNO ALAJOKI</h2>
          <h3 class="text-md font-bold text-tertiary">
            National Director @ UAE YFC/EYU
          </h3>
          <p class="text-md text-justify">
            From the Nordic country of Finland, Arno has been living in the UAE
            since 2022. He holds a BA in Applied Theology and MTh in Systematic
            Theology. He is passionate about equipping and empowering the young
            generation to live out the purpose God has intended for them.
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">FRANK MEYER</h2>
          <h3 class="text-md font-bold text-tertiary">
            Youth Pastor @ Fellowship Dubai
          </h3>
          <p class="text-md text-justify">
            Frank's been the go-to guru for teens in the UAE since 2011,
            masterfully guiding them through the wild ride of becoming young
            adults! He’s all about sparking those dreams while sprinkling in
            some good ol' Gospel inspiration. Talk about a motivational leader!
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">ELIZABETH SHAHADA</h2>
          <h3 class="text-md font-bold text-tertiary">
            Young Adults Pastor @ Fellowship Dubai
          </h3>
          <p class="text-md text-justify">
            Meet Elizabeth, an Aussie-Egyptian with a degree in international
            business and corporate experience. Now focused on uplifting youth,
            she uses her event-planning skills to inspire young adults to live
            purposefully. In her free time, she enjoys table tennis, basketball,
            clean comedy, and puzzles!
          </p>
        </div>
      </div>
      <div class="max-w-1/2 h-64 grow flex gap-4 p-4">
        <img
          class="w-1/2 border object-cover object-center rounded-lg bg-black"
        />
        <div class="w-1/2 flex flex-col gap-2 items-start">
          <h2 class="text-2xl font-bold text-secondary">SAJEEL JOHN</h2>
          <h3 class="text-md font-bold text-tertiary">Pastor</h3>
          <p class="text-md text-justify">
            Sajeel has been serving in ministry for the last 9 years. From
            Pakistan, he's had the privilege to help in church planting in
            Africa and Pakistan, and currently leads a church in Dubai. He has
            served in youth ministry and works with adults throughout his
            ministry.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    id="signup"
    class="flex flex-col h-fit w-full justify-center items-center gap-15 py-30"
  >
    <div class="flex flex-col gap-2">
      <h1 class="text-5xl font-bold text-primary w-full text-center">
        SIGN UP
      </h1>
      <p>Registration opens August 1 2025</p>
    </div>

    <form @submit.prevent="" class="flex flex-wrap gap-4 w-1/2 min-w-72">
      <p class="w-full text-left font-semibold text-xl">Personal Information</p>
      <TextInput
        v-model="fullName"
        :title="'Full Name'"
        :placeholder="'Enter full name'"
        :error="fullName == undefined || fullName == ''"
      />
      <DropdownInput
        v-model="gender"
        :title="'Gender'"
        :options="['Male', 'Female']"
        :placeholder="'Choose gender'"
        :error="gender == undefined"
      />
      <DateInput
        v-model="dateOfBirth"
        :title="'Date of Birth'"
        :placeholder="'xx/xx/xxxx'"
        :error="dateOfBirth == undefined"
      />
      <NumberInput
        v-model="age"
        :title="'Age (as of July 1, 2025)'"
        :placeholder="'Enter age'"
        :error="age == undefined"
      />
      <DropdownInput
        v-model="nationality"
        :title="'Nationality'"
        :options="countryList"
        :placeholder="'Choose country'"
        :error="nationality == undefined"
      />
      <TextInput
        v-model="idNumber"
        :title="'Emirates ID / Passport Number'"
        :placeholder="'Emirates ID preferred'"
        :error="idNumber == undefined"
      />
      <TextInput
        v-model="emailAddress"
        :title="'Email Address'"
        :placeholder="'e.g.: example@eyu.com'"
        :error="emailAddress == undefined"
      />
      <TextInput
        v-model="phoneNumber"
        :title="'Phone Number'"
        :placeholder="'e.g.: +9715XXXXXXXX'"
        :error="phoneNumber == undefined"
      />
      <TextInput
        v-model="emergencyName"
        :title="'Emergency Contact Name'"
        :placeholder="'Enter name'"
        :error="emergencyName == undefined"
      />
      <TextInput
        v-model="emergencyNumber"
        :title="'Emergency Contact Number'"
        :placeholder="'e.g.: +9715XXXXXXXX'"
        :error="emergencyNumber == undefined"
      />
      <DropdownInput
        v-model="role"
        :title="'What are you signing up as? (Leader/Student)'"
        :options="['Leader', 'Senior', 'Junior']"
        :placeholder="'Choose role'"
        :error="role == undefined"
      />
      <p class="w-full text-left font-semibold text-xl">Church Information</p>
      <TextInput
        v-model="churchName"
        :title="'Church Name'"
        :placeholder="'Enter church name'"
        :error="churchName == undefined"
      />
      <NumberInput
        v-model="churchCode"
        :title="'Church Code'"
        :placeholder="'e.g.: 1234'"
        :error="churchCode == undefined"
      />
      <TextInput
        v-model="leaderName"
        :title="'Youth Group Leader Name'"
        :placeholder="'Enter leader\'s name'"
        :error="leaderName == undefined"
      />
      <TextInput
        v-model="leaderNumber"
        :title="'Youth Group Leader Contact'"
        :placeholder="'Enter leader\'s number'"
        :error="leaderNumber == undefined"
      />
      <p class="w-full text-left font-semibold text-xl">
        Additional Information
      </p>
      <DropdownInput
        v-model="size"
        :title="'T-Shirt Size'"
        :options="['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']"
        :placeholder="'Choose shirt size'"
        :error="size == undefined"
      />
      <DropdownInput
        v-model="swimming"
        :title="'Swimming Ability'"
        :options="['Beginner', 'Intermediate', 'Advanced']"
        :placeholder="'Choose proficiency level'"
        :error="swimming == undefined"
      />
      <DropdownInput
        v-model="allergies"
        :title="'Any allergies/medical conditions?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="allergies == undefined"
      />
      <TextInput
        v-model="allergiesInfo"
        :title="'Allergy/Medical Information'"
        :placeholder="'Please specify'"
        :error="allergiesInfo == undefined"
        :disabled="allergies == undefined || allergies == false"
      />
      <DropdownInput
        v-model="medication"
        :title="'Are you currently on any medication?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="medication == undefined"
      />
      <TextInput
        v-model="medicationInfo"
        :title="'Medication Information'"
        :placeholder="'Please specify'"
        :error="medicationInfo == undefined"
        :disabled="medication == undefined || medication == false"
      />
      <p class="w-full text-left font-semibold text-xl">Seniors Conference</p>
      <DropdownInput
        v-model="graduating"
        :title="'Are you graduating school in 2025-26?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="graduating == undefined"
      />
      <DropdownInput
        v-model="launchConf"
        :title="'Interest for Launch Conference?'"
        :options="[true, false]"
        :placeholder="'Choose option'"
        :error="launchConf == undefined"
        :disabled="graduating == undefined || graduating == false"
      />
      <p class="w-full text-left font-semibold text-xl">
        Merchandise Pre-Orders
      </p>
      <p class="w-full text-left">
        This section is for those who would like to pre-purchase additional
        merchandise prior to the event. Merchandise must be paid for during
        registration payment and can be collected at the event.
      </p>
      <CheckboxInput v-model="eyuCap" :use-image="true" :title="'EYU Cap'" />
      <CheckboxInput
        v-model="bw25LimitedShirt"
        :use-image="true"
        :title="'Big Weekend 2025 Limited Edition Shirt'"
      />
      <DropdownInput :disabled="bw25LimitedShirt != true" :options="['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']" :placeholder="'Choose size'" :title="'Big Weekend 2025 Limited Edition Shirt Size'" />
      <p class="w-full text-left font-semibold text-xl">
        Payment Method
        <span
          v-if="onlinePayment == undefined"
          class="font-semibold text-red-900 text-lg"
          >Required</span
        >
      </p>
      <div class="flex gap-2">
        <input
          name="paymentOptions"
          v-model="onlinePayment"
          value="true"
          type="radio"
        />
        <label class="text-left"
          >Online Payment (redirects to payment link)</label
        >
      </div>
      <div class="flex gap-2">
        <input
          name="paymentOptions"
          v-model="onlinePayment"
          value="false"
          type="radio"
        />
        <label class="text-left"
          >I am applying for a scholarship through my church</label
        >
      </div>
      <p class="w-full text-left">
        By submitting this form, I confirm that all information provided is
        accurate to the best of my knowledge. I understand that participation in
        Big Weekend 2025 is contingent on submitting required documentation, on
        completing the full payment, and the information submitted here being
        correct and valid.
      </p>
      <button
        type="submit"
        @click="handleSubmit"
        class="cursor-pointer bg-secondary text-white rounded-lg pt-2 pb-1 px-4 font-semibold"
      >
        Register
      </button>
      <p class="font-semibold text-center text-red-900 pt-2">{{ errorText }}</p>
    </form>
  </div>

  <div id="footer" class="flex justify-center items-center w-full h-fit">
    <div
      class="text-white bg-background-layer flex justify-between items-start w-11/12 p-8 rounded-lg mb-8"
    >
      <img src="/bw-25-logo.png" class="aspect-auto h-10" />
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#about">about</a>
        <a class="text-md text-left" href="#theme">theme</a>
        <a class="text-md text-left" href="#speakers">speakers</a>
      </div>
      <div class="flex flex-col gap-2">
        <a class="text-md text-left" href="#about">student sign up</a>
        <a class="text-md text-left" href="#about">leader sign up</a>
      </div>
      <div class="flex gap-10">
        <a href="/"><img class="h-6 w-6" src="/mail.png" /></a>
        <a href="/"><img class="h-6 w-6 ml-1.5" src="/whatsapp.png" /></a>
        <a href="/"><img class="h-6 w-6" src="/instagram.png" /></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
