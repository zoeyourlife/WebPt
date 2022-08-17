class FolderScroll {
    constructor(wrapper, sticky) {
        this.wrapper = wrapper
        this.sticky = sticky
        this.children = this.sticky.querySelectorAll('.section')
        this.length = this.children.length
        this.headerVh = 6
        this.contentVh = 100 - this.headerVh * this.length - 3 /* 100-높이인 각 섹션들의 높이의 총합 */
        this.start = 0
        this.end = 0
    }

    init() {
        this.start = this.wrapper.offsetTop
        this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight

        this.children.forEach((child, i) => {
            child.style.bottom = -100 + this.headerVh * (this.length - i) + 'vh'
            child.querySelector('.title').style.height = this.headerVh + 'vh'
            child.querySelector('.content').style.height = this.contentVh + 'vh'
        })

    }

    animate() {
        this.children.forEach((child, i) => {
            const unit = (this.end - this.start) / this.length
            const s = this.start + unit * i + 100
            const e = this.start + unit * (i + 1)
            

            if (scrollY <= s) {
                child.style.transform = `translate3d(0, 0, 0)`
            } else if (scrollY >= e) {
                child.style.transform = `translate3d(0, ${-this.contentVh}%, 0)`
            } else {
                child.style.transform = `translate3d(0, ${(scrollY - s )/ (unit - 100) * (-this.contentVh)}%, 0)`
            }
        })
    }
    
}
const mainContent1 = document.querySelector('.main-content-1')
const sticky = document.querySelector('.sticky')
const folderScroll = new FolderScroll(mainContent1, sticky)

folderScroll.init()


window.addEventListener('scroll', () => {
    folderScroll.animate()
}) //실행하기 위해 animate 함수를 아래의 window의 scrollevent를 작성

window.addEventListener('resize', () => {
    folderScroll.animate()
}) // offset 값은 한번 정해지면 화면 사이즈 값이 그대로이기 때문에 
// window resize 이벤트를 만들어서 화면이 바뀔때마다 init이 되게 작성