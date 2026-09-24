// كل بياناتك الشخصية هنا. غيّر أي شيء وسيتغير في الموقع كله.
const ph=n=>({title:{en:'Project '+n+' (placeholder)',ar:'مشروع '+n+' (مكان مؤقت)'},desc:{en:'Placeholder – replace with a real project.',ar:'مكان مؤقت – استبدله بمشروع حقيقي.'},tech:['React'],github:'',demo:'',image:''})
export default {
  name:'Eng. Omar Elgendy', nameAr:'م. عمر الجندي', age:18,
  town:{en:'Sirs El-Layyan, Menoufia, Egypt',ar:'سرس الليان، المنوفية، مصر'},
  phone:'201032853311',            // رقم الواتساب بدون + وبدون مسافات
  telegram:'https://t.me/omarelgendyy6',
  photo:'images/omar.jpg',         // صورتك داخل public/images
  projects:[ph(1),ph(2),ph(3)]
}
