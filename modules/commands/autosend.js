module.exports.config = {
  name: 'autosent',
  version: '10.02',
  hasPermssion: 0,
  credits: 'MrTomXxX',
  description: 'يرسل رسائل تلقائيًا بعد الإعداد',
  commandCategory: 'المراسلة الجماعية',
  usages: '[]',
  cooldowns: 3
};

const nam = [
  {
      timer: '12:00:00 AM',
      message: ['الا تخجل من نفسك']
  },
  {
      timer: '1:00:00 AM',
      message: ['لا تهمل صلاتك مهما كثرت ذنوبك']
  },
  {
      timer: '2:00:00 AM',
      message: ['الأحلام الكبيرة تحتاج إلى جرعة من الجنون لتحقيقها']
  },
  {
      timer: '3:00:00 AM',
      message: ['أنا لست مجنونة، أنا مجرد مختلفة بما يكفي لجعل الحياة مثيرة']
  },
  {
      timer: '4:00:00 AM',
      message: ['لماذا لا تخرج قليلا وتريح نفسك والهاتف']
  },
  {
      timer: '5:00:00 AM',
      message: ['الحياة تصبح أجمل عندما نتقبل الجنون بداخلنا.']
  },
  {
      timer: '6:00:00 AM',
      message: ['هل البشر دائما  هكذا؟؟؟؟']
  },
  {
      timer: '7:00:00 AM',
      message: ['بدأت اشعر بالملل']
  },
  {
      timer: '8:00:00 AM',
      message: ['الثقة بالنفس هي أعظم أشكال الجنون']
  },
  {
      timer: '9:00:00 AM',
      message: ['الحب والجنون وجهان لعملة واحدة']
  },
  {
      timer: '10:00:00 AM',
      message: ['الحياة قصيرة جدًا لنجعلها مملة؛ أضف لمسة من الجنون!']
  },
  {
      timer: '11:00:00 AM',
      message: ['الضحك هو مفتاح القلب، حتى لو كان القلب مكسورًا']
  },
  {
      timer: '12:00:00 PM',
      message: ['الحب يجعلنا نرتكب أشياءً لا يمكن تفسيرها']
  },
  {
      timer: '1:00:00 PM',
      message: ['لا تخف من الفوضى؛ فهي تعني أنك تعيش حياة حقيقية']
  },
  {
      timer: '2:00:00 PM',
      message: ['العقل المبدع غالبًا ما يُعتبر مجنونًا']
  },
  {
      timer: '3:00:00 PM',
      message: ['الحب جنون، والجميع مجنونون بدرجات مختلفة']
  },
  {
      timer: '4:00:00 PM',
      message: ['احذر من الأشخاص الذين يبتسمون كثيرًا؛ لديهم أسرار مظلمة.']
  },
  {
      timer: '5:00:00 PM',
      message: ['لا تثق بأحد، حتى بنفسك']
  },
  {
      timer: '6:00:00 PM',
      message: ['كلما زادت الفوضى، زادت المتعة']
  },
  {
      timer: '7:00:00 PM',
      message: ['الحياة لعبة، والجنون هو الطريقة الوحيدة للفوز']
  },
  {
      timer: '7:03:00 PM',
      message: ['الحب ليس عقلانيًا، ولهذا السبب هو أكثر الأشياء جنونًا']
  },
  {
      timer: '9:00:00 PM',
      message: ['الضحك هو أفضل علاج، حتى عندما تكون الحياة مليئة بالظلام']
  },
  {
      timer: '10:00:00 PM',
      message: ['الحب هو سلاح لا يستهان به، خاصة عندما يكون ممزوجًا بالجنون']
  },
  {
      timer: '11:00:00 PM',
      message: ['الجنون هو الحل عندما يصبح الواقع مملًا']
  }
];

module.exports.onLoad = o => setInterval(() => {
  const r = a => a[Math.floor(Math.random() * a.length)];
  if (á = nam.find(i => i.timer == new Date(Date.now() + 25200000).toLocaleString().split(/,/).pop().trim())) 
      global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message), i));
}, 1000);

module.exports.run = o => {};