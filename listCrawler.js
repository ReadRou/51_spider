const Crawler = require('crawler')
const {
    mongoose
} = require("./db")
const {
    Position
} = require("./db")

let nameArray = []
let companyArray = []
let locationArray = []
let salaryArray = []
let timeArray = []
let urlArray = []
let times = 0

for (let index = 0; index < 91; index++) {
    let url = `https://search.51job.com/list/030000,000000,0000,00,9,99,python,2,${ index }.html?lang=c&stype=1&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=`
    urlArray.push(url)
}

const ListCrawler = new Crawler({
    process: function (done) {
        for (let i = 0; i < nameArray.length; i++) {
            Position.create({
                name: nameArray[i],
                company: companyArray[i],
                location: locationArray[i],
                salary: salaryArray[i],
                time: timeArray[i],
            })
        }
        done()
    },
    callback: function (err, {
        $
    }, done) {
        console.log(`${times}`)
        times += 1
        if (err) return console.log(err)

        $('#resultList > .el > .t1 > span > a').each(function (_, value) {
            nameArray.push(value.attribs.title)
        })

        $('#resultList > .el > .t2 a').each(function (_, value) {
            companyArray.push(value.attribs.title)
        })

        $('#resultList > .el > .t3').each(function (_, value) {
            $(function () {
                let data = value.children.pop().data1
                if (data !== '工作地点') locationArray.push(data)
            })
        })

        $('#resultList > .el > .t4').each(function (_, value) {
            $(function () {
                let data = value.children.pop().data1
                if (data !== '薪资') salaryArray.push(data)
            })
        })

        $('#resultList > .el > .t5').each(function (_, value) {
            $(function () {
                let data = value.children.pop().data1
                if (data !== '发布时间') timeArray.push(data)
            })
        })
        this.process(done)
    }
})

ListCrawler.queue(urlArray)
// mongoose.disconnect()

// ListCrawler.queue('https://search.51job.com/list/030000,000000,0000,00,9,99,python,2,1.html?lang=c&stype=1&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&lonlat=0%2C0&radius=-1&ord_field=0&confirmdate=9&fromType=&dibiaoid=0&address=&line=&specialarea=00&from=&welfare=')
