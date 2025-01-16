---
permalink: /
title: "Hi! Welcome to Erwin's Homepage!"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am currently a master's degree student at Tsinghua University, Beijing, China. 

st.write('\n')
st.subheader("Experience & Qualifications")
st.write("""
- ✔️ 3 Years of Working Experience in Education, Research, and Government Relations
- ✔️ Well-trained in writing and public speaking 
- ✔️ Understanding of statistical principles and applications
- ✔️ Excellent team player and displaying a strong sense of initiative on tasks
- ✔️ Life-long Learner, with focus in public policy, data and AI, enterpreneurship 
""")

Professional Experience 
======
# --- JOB 1 ---
# Display the logo with base64 and the text using st.write()
st.markdown(f"""
    <div style="text-align: left; margin-bottom: 20px;">
        <img src="data:image/png;base64,{kompas_logo_base64}" style="width:200px;">
    </div>
""", unsafe_allow_html=True)

st.write("💡", "**Assistant Researcher, Data Analyst, Illustrator | KOMPAS Research & Development**")
st.write("03/2020 - Present")
st.write("""
- ⁜ Doing research on various fields, particularly Indonesia's industrial upstreaming policy, energy transition, AI and Big Data regulation. 
- ⁜ Regular writer to Kompaspedia platform
- ⁜ Research report illustrator
""")
st.write('\n')

# --- JOB 2 ---
# Display both logos side by side using base64
st.markdown(f"""
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <img src="data:image/png;base64,{kemenko_logo_base64}" style="width:70px; margin-right: 10px;">
        <img src="data:image/png;base64,{hdcm_logo_base64}" style="width:50px;">
    </div>
""", unsafe_allow_html=True)

st.write("📊", "**Consultant | Coordinating Ministry for Maritime Affairs and Investment, Indonesia**")
st.write("08/2021 - 09/2022")
st.write("""
- ⁜ Consultant for Secretariat of High-level Dialogue and Cooperation Mechanism between Republic of Indonesia and People's Republic of China
- ⁜ Coordinating inter-ministerial works and bilateral meetings, supervising investment projects, and hosting business matching forums and focus group discussions
- ⁜ Chinese interpreter and document translations
""")
st.write('\n')

# --- JOB 3 ---
# Display both logos side by side using base64
st.markdown(f"""
    <div style="text-align: left; margin-bottom: 20px;">
        <img src="data:image/png;base64,{xavier_logo_base64}" style="width:50px;">
    </div>
""", unsafe_allow_html=True)

st.write("🇫🇲", "**Teacher | Xavier High School, Federated States of Micronesia**")
st.write("08/2019 - 03/2020")
st.write("""
- ⁜ Teaching Ethics, Latin Language, French A1 and Chinese HSK 1-2
- ⁜ Coordinating campus ministry and social service programs
""")

Getting started
======
Bla bla bla

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

The repository includes [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the Academic Pages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/), the [growing wiki](https://github.com/academicpages/academicpages.github.io/wiki), and you can always [ask a question on GitHub](https://github.com/academicpages/academicpages.github.io/discussions). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
