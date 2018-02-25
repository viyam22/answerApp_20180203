const config = {
	questionTime: 120,   // 每个题库倒计时时间,s
	lessTime: 10,       // 剩时不多,s
	nextQuestionTime: 1500,  // 每条题目间隔时间, ms
}

const api = {
	
}

const path = {
	topicListPage: '../topic-list/topic-list',
	topicPage: '../topic/topic',
	questionPage: '../question/question',
	indexPage: '../index/index',
	indexPage: '../index/index',
	giftPage: '../gift/gift',
	myDataPage: '../myData/myData',
	wrongPage: '../wrong/wrong',
	descPage: '../desc/desc'
}

module.exports = {
	config,
	api,
	path
}