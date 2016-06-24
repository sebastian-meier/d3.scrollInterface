# d3.scrollInterface
Framework for building scrollable visualization interfaces in D3

Design considerations when designing a scrolling visualization interface

http://www.theguardian.com/us-news/ng-interactive/2015/oct/19/homan-square-chicago-police-detainees
http://www.r2d3.us/visual-intro-to-machine-learning-part-1/
http://www.zeit.de/gesellschaft/deutschland-ost-west-umfragen.html?slide=12 > stack mike bostock

How to scroll (Mike, Bostock)
https://bost.ocks.org/mike/scroll/
Is Up really up 
http://www.kiledaldesign.no/essay/is-up-really-up

The technology behind scroll interfaces has already been explained by many, a good example is the post by Mr. Vallandingham.

## 1. Type of scroll interface

There are probably more, but i could think of 3 types:

### 1.1. Fullscreen Interface
One Fullscreen visualization with interface elements, maybe a small navigation, but beyond that everything happens within that fullscreen application, which is at a fixed position, even though the user is scrolling, she does not see the actual page scrolling, but instead only the full screen interface.

### 1.2. Combining the fullscreen and scrolling elements
Part of the page is covered by a container which stays at a fixed position, while (in the background) the actual page scrolls along.

### 1.3. Mixing fullscreen and normal page elements
I think this version is not as common. Fullscreen Interfaces like in type 1 and normal page elements are combined, giving you the most flexibility. You can also add type 2 elements in here.

## 2. Responsiveness
What every type of scrolling interface you will build, you have to think about responsiveness. Most scrollers ignore this and just force a certain width and every screen smaller than that is in bad luck. While this is probably fine for many cases, i would like to take it a step further here and add some responsiveness. Many scrolling interfaces are really tricky on mobile devices (e.g. too many events being fired (more about this later)), due to that you might want to think about a way of removing the scrolling feature on mobile and replace it with:

### 2.a Steps
In many cases you will create a storyline with keyframes (more about this later), which you will use to tell your story. You can use these explicit steps to simply create a step by step animation, where the user clicks a button to proceed.

### 2.b No scrolling at all but instead several graphics
Often scrolling interfaces are used to create transitions between states. While this holds a certain narrative that helps the user understand the story through the data, for mobile this approach could be easily converted into creating several visualizations which sit below each other and the user simply scrolls through those visualizations.

## 3. Event Overloading
When you listen to scroll and resize events, you get a lot of events fired from the browser window, a lot. Depending on how complex your animations are this can get you into trouble, no matter if you are on mobile or desktop. To avoid this we should include a few things within our visualizations:

### 3.a Debouncer

### 3.b States

### 3.c animations

## 4. Storyline & Interaction Principles
I have already mentioned the actual storyline a couple of times. This bit is important especially as length and complexity of your story grows.

### 4.a Percentage

### 4.b Time (or rather Pixels)

### 4.c Steps with swipes
While most scrolling interfaces use the full page as a kind of timeline to manage the animation timing, Zeit.de took a slightly different, but the more interesting approach. The interpret the scrolling event in a way, somebody would "swipe" a page on a touch enabled device. Instead of letting the user scroll through the entire story, bursts of scroll activity a interpreted as a forward or backward event on the timeline. Switching between explicit keyframes on the timeline. Once understood, this technique gives the user great control over the ui, as well as making the handling of time, animations and keyframes for the developers a lot easier.

Scrolling simply as input (Zeit)

http://vallandingham.me/scroll_talk/

scrolling dimensions
scrolling triggers
scrolling steps
scrolling continous
interactive story telling

combine steppers and scrollers

## 0. Should i use a scroll interface

To be honest, i started this whole project because i wanted to build a scroll interface, but when i was done i realized, even though the whole thing looked nice and the overall experience was good, it did not really make any sense. So before you build you scroll interface, think about why you want to add a scroll interface. Scroll interfaces are great for storytelling (NYT) or "video" like visualization experiences (machine learning). They can be a good way to introduce the user to an interface before she is allowed to explore the visualization by herself (NYT). If you have a text driven page and you would like to add and interactive bit that follows along this works great (RUSSIA ROAD). But in many cases this will not make sense and you will simply add another level of complexity, which is not really useful. When it comes to casual browsing and activities alike, providing a scroll away experience is important, but in many other situations would defend the standpoint that a well designed system can ask its users to interact, an immersive user experience can draw the user into the interface and foster exploration through interaction. While we should always have the old HCI mantra Don't make me think back in our heads we should not underestimate our users.
