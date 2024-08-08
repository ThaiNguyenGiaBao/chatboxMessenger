const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["vi"] });

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// CONTACT_AGENT
manager.addDocument(
  "vi",
  "Tôi cần nói chuyện với tư vấn viên",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Làm thế nào để liên hệ với tư vấn viên?",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Tôi có thể gọi cho tư vấn viên không?",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Tôi muốn liên hệ với bộ phận chăm sóc khách hàng",
  "CONTACT_AGENT"
);
manager.addDocument("vi", "Làm sao để gặp tư vấn viên?", "CONTACT_AGENT");
manager.addDocument(
  "vi",
  "Tôi cần nói chuyện với ai đó về tình trạng của con tôi",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Tôi có thể gặp trực tiếp tư vấn viên không?",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Tôi muốn nói chuyện với người tư vấn",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Cho tôi số điện thoại của tư vấn viên",
  "CONTACT_AGENT"
);
manager.addDocument(
  "vi",
  "Làm thế nào để liên hệ với nhân viên hỗ trợ?",
  "CONTACT_AGENT"
);

manager.addAnswer(
  "vi",
  "CONTACT_AGENT",
  "Bạn có thể liên hệ với tư vấn viên qua số điện thoại 123-456-789."
);
manager.addAnswer(
  "vi",
  "CONTACT_AGENT",
  "Chúng tôi sẽ sắp xếp tư vấn viên liên lạc với bạn ngay."
);
manager.addAnswer(
  "vi",
  "CONTACT_AGENT",
  "Bạn có thể gặp trực tiếp tư vấn viên tại bệnh viện hoặc qua điện thoại."
);

// ADVISE
manager.addDocument(
  "vi",
  "Tôi cần lời khuyên về sức khỏe của con tôi",
  "ADVISE"
);
manager.addDocument(
  "vi",
  "Có cách nào để con tôi khỏe mạnh hơn không?",
  "ADVISE"
);
manager.addDocument(
  "vi",
  "Làm thế nào để tăng cường sức khỏe cho trẻ em?",
  "ADVISE"
);
manager.addDocument(
  "vi",
  "Tôi muốn biết cách chăm sóc sức khỏe cho con tôi",
  "ADVISE"
);
manager.addDocument(
  "vi",
  "Bạn có thể cho tôi lời khuyên về chế độ dinh dưỡng cho trẻ?",
  "ADVISE"
);
manager.addDocument("vi", "Làm sao để con tôi không bị bệnh?", "ADVISE");
manager.addDocument("vi", "Tôi nên làm gì khi con tôi bị ho?", "ADVISE");
manager.addDocument(
  "vi",
  "Bạn có lời khuyên nào về việc chăm sóc trẻ sơ sinh không?",
  "ADVISE"
);
manager.addDocument("vi", "Tôi nên làm gì khi con tôi bị sốt?", "ADVISE");
manager.addDocument(
  "vi",
  "Bạn có thể cho tôi một số lời khuyên về chăm sóc trẻ nhỏ không?",
  "ADVISE"
);

manager.addAnswer(
  "vi",
  "ADVISE",
  "Bạn nên cho con uống đủ nước và ăn đầy đủ dưỡng chất."
);
manager.addAnswer(
  "vi",
  "ADVISE",
  "Điều quan trọng là giữ ấm cho con khi trời lạnh và không để con tiếp xúc với người bị bệnh."
);
manager.addAnswer(
  "vi",
  "ADVISE",
  "Hãy đưa con đến bác sĩ để được tư vấn chi tiết hơn."
);

// SERVICES
manager.addDocument("vi", "Bệnh viện cung cấp những dịch vụ gì?", "SERVICES");
manager.addDocument(
  "vi",
  "Tôi muốn biết các dịch vụ khám bệnh ở đây",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Dịch vụ khám sức khỏe cho trẻ em bao gồm những gì?",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Bạn có cung cấp dịch vụ tiêm chủng cho trẻ không?",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Tôi muốn biết về các dịch vụ chăm sóc sức khỏe trẻ em",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Bệnh viện có cung cấp dịch vụ tư vấn dinh dưỡng không?",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Tôi cần thông tin về các dịch vụ của bệnh viện",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Bệnh viện có dịch vụ khám bệnh tại nhà không?",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Các dịch vụ y tế cho trẻ em ở đây bao gồm những gì?",
  "SERVICES"
);
manager.addDocument(
  "vi",
  "Bạn có dịch vụ kiểm tra sức khỏe toàn diện cho trẻ em không?",
  "SERVICES"
);

manager.addAnswer(
  "vi",
  "SERVICES",
  "Bệnh viện cung cấp các dịch vụ khám bệnh, tư vấn dinh dưỡng, và tiêm chủng cho trẻ em."
);
manager.addAnswer(
  "vi",
  "SERVICES",
  "Chúng tôi có dịch vụ khám bệnh tại nhà và tư vấn dinh dưỡng từ xa."
);
manager.addAnswer(
  "vi",
  "SERVICES",
  "Các dịch vụ y tế cho trẻ em bao gồm khám bệnh, tiêm chủng và tư vấn sức khỏe."
);

// APPOINTMENT
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch khám bệnh cho con tôi",
  "APPOINTMENT"
);
manager.addDocument("vi", "Làm sao để đặt lịch hẹn với bác sĩ?", "APPOINTMENT");
manager.addDocument(
  "vi",
  "Tôi có thể đặt lịch khám qua điện thoại không?",
  "APPOINTMENT"
);
manager.addDocument("vi", "Làm thế nào để đặt lịch khám bệnh?", "APPOINTMENT");
manager.addDocument(
  "vi",
  "Tôi cần đặt lịch hẹn khám bệnh cho con tôi",
  "APPOINTMENT"
);
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch khám bệnh vào ngày mai",
  "APPOINTMENT"
);
manager.addDocument(
  "vi",
  "Tôi có thể đặt lịch hẹn với bác sĩ trực tiếp không?",
  "APPOINTMENT"
);
manager.addDocument(
  "vi",
  "Bạn có thể giúp tôi đặt lịch hẹn với bác sĩ không?",
  "APPOINTMENT"
);
manager.addDocument(
  "vi",
  "Làm sao để đặt lịch khám bệnh cho trẻ?",
  "APPOINTMENT"
);
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch hẹn khám bệnh vào cuối tuần này",
  "APPOINTMENT"
);

manager.addAnswer(
  "vi",
  "APPOINTMENT",
  "Bạn có thể đặt lịch hẹn qua điện thoại hoặc trực tuyến."
);
manager.addAnswer(
  "vi",
  "APPOINTMENT",
  "Hãy gọi số 123-456-789 để đặt lịch hẹn với bác sĩ."
);
manager.addAnswer(
  "vi",
  "APPOINTMENT",
  "Bạn có thể đặt lịch khám trực tiếp tại bệnh viện hoặc qua ứng dụng di động của chúng tôi."
);

// BOOK_HEALTH_CHECK
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch kiểm tra sức khỏe cho con tôi",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Làm sao để đặt lịch kiểm tra sức khỏe cho trẻ?",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Tôi cần đặt lịch kiểm tra sức khỏe",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Bạn có thể giúp tôi đặt lịch kiểm tra sức khỏe cho trẻ không?",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch kiểm tra sức khỏe toàn diện cho con tôi",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Làm thế nào để đặt lịch kiểm tra sức khỏe cho trẻ em?",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Tôi cần kiểm tra sức khỏe định kỳ cho con tôi",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Bạn có dịch vụ kiểm tra sức khỏe định kỳ không?",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Tôi muốn đặt lịch kiểm tra sức khỏe tổng quát cho con tôi",
  "BOOK_HEALTH_CHECK"
);
manager.addDocument(
  "vi",
  "Làm sao để kiểm tra sức khỏe cho con tôi?",
  "BOOK_HEALTH_CHECK"
);

manager.addAnswer(
  "vi",
  "BOOK_HEALTH_CHECK",
  "Bạn có thể đặt lịch kiểm tra sức khỏe qua điện thoại hoặc trực tuyến."
);
manager.addAnswer(
  "vi",
  "BOOK_HEALTH_CHECK",
  "Hãy gọi số 123-456-789 để đặt lịch kiểm tra sức khỏe."
);
manager.addAnswer(
  "vi",
  "BOOK_HEALTH_CHECK",
  "Chúng tôi sẽ giúp bạn đặt lịch kiểm tra sức khỏe cho con một cách nhanh chóng."
);

// DISEASE
manager.addDocument("vi", "Con tôi bị sốt, tôi nên làm gì?", "DISEASE");
manager.addDocument("vi", "Làm sao để biết con tôi bị bệnh gì?", "DISEASE");
manager.addDocument(
  "vi",
  "Con tôi có dấu hiệu bị bệnh, tôi nên làm gì?",
  "DISEASE"
);
manager.addDocument(
  "vi",
  "Tôi cần biết thông tin về bệnh của con tôi",
  "DISEASE"
);
manager.addDocument("vi", "Làm thế nào để nhận biết bệnh ở trẻ em?", "DISEASE");
manager.addDocument(
  "vi",
  "Tôi nghĩ con tôi bị bệnh, tôi nên làm gì?",
  "DISEASE"
);
manager.addDocument(
  "vi",
  "Bạn có thể giúp tôi chẩn đoán bệnh của con tôi không?",
  "DISEASE"
);
manager.addDocument(
  "vi",
  "Con tôi có triệu chứng ho và sổ mũi, tôi nên làm gì?",
  "DISEASE"
);
manager.addDocument(
  "vi",
  "Tôi lo lắng con tôi bị nhiễm bệnh, tôi phải làm gì?",
  "DISEASE"
);
manager.addDocument(
  "vi",
  "Làm sao để xử lý khi con tôi bị tiêu chảy?",
  "DISEASE"
);

manager.addAnswer(
  "vi",
  "DISEASE",
  "Bạn nên theo dõi triệu chứng của con và đưa con đi khám bác sĩ nếu cần."
);
manager.addAnswer(
  "vi",
  "DISEASE",
  "Trong trường hợp con bạn bị sốt cao, hãy đưa con đến bệnh viện ngay lập tức."
);
manager.addAnswer(
  "vi",
  "DISEASE",
  "Hãy giữ ấm cho con và cho con uống nhiều nước. Nếu tình trạng không cải thiện, hãy gặp bác sĩ."
);

// ACCIDENT
manager.addDocument("vi", "Con tôi bị ngã, tôi nên làm gì?", "ACCIDENT");
manager.addDocument(
  "vi",
  "Làm sao để xử lý khi con tôi bị chảy máu?",
  "ACCIDENT"
);
manager.addDocument("vi", "Con tôi bị đứt tay, tôi nên làm gì?", "ACCIDENT");
manager.addDocument("vi", "Tôi cần làm gì khi con tôi bị thương?", "ACCIDENT");
manager.addDocument("vi", "Làm sao để xử lý khi con tôi bị bỏng?", "ACCIDENT");
manager.addDocument(
  "vi",
  "Con tôi bị tai nạn nhỏ, tôi nên xử lý thế nào?",
  "ACCIDENT"
);
manager.addDocument(
  "vi",
  "Tôi nên làm gì khi con tôi bị trầy xước?",
  "ACCIDENT"
);
manager.addDocument("vi", "Con tôi bị va đầu, tôi nên làm gì?", "ACCIDENT");
manager.addDocument("vi", "Làm sao để sơ cứu khi con tôi bị ngã?", "ACCIDENT");
manager.addDocument("vi", "Tôi cần làm gì khi con tôi bị tai nạn?", "ACCIDENT");

manager.addAnswer(
  "vi",
  "ACCIDENT",
  "Hãy rửa vết thương bằng nước sạch và đưa con đi khám nếu vết thương nghiêm trọng."
);
manager.addAnswer(
  "vi",
  "ACCIDENT",
  "Trong trường hợp chảy máu nhiều, hãy băng chặt vết thương và đưa con đến bệnh viện ngay."
);
manager.addAnswer(
  "vi",
  "ACCIDENT",
  "Hãy giữ bình tĩnh và xử lý vết thương của con. Nếu cần thiết, hãy gọi cấp cứu."
);

// Train and save the model.
(async () => {
  await manager.train();
  manager.save();
})();

function askQuestion() {
  rl.question("User: ", async (answer) => {
    const response = await manager.process("vi", answer);
    console.log(response);
    if (response.answer) {
      console.log("Bot:", response.answer);
    } else {
      console.log(
        "Bot:",
        "Tôi không hiểu câu hỏi của bạn. Bạn có thể nói rõ hơn không?"
      );
    }
    askQuestion(); // Ask the next question
  });
}

askQuestion();
