import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: '700',
  },
  divider: {
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  link: {
    color: 'steelblue',
    fontWeight: '600',
    paddingVertical: 2,
  },
});

function About() {
  const [loadingWebview, setLoading] = useState(true);

  return (
    <StatusBarSafeLayout>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>数据来源</Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://github.com/wuhan2020/wuhan2020')
              }>
              https://github.com/wuhan2020/wuhan2020
            </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://3g.dxy.cn/newh5/view/pneumonia')
              }>
              丁香园
            </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('https://2019ncov.nosugartech.com/')
              }>
              https://2019ncov.nosugartech.com/
            </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL('http://ncov.news.dragon-yuan.me/')
              }>
              http://ncov.news.dragon-yuan.me/
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.header}>wuhan2020</Text>
            <Text style={{ lineHeight: 18 }}>
              我们是 GitHub
              开源社区的志愿者核心团队，在抗击非冠病毒的战役中，我们希望通过共同构建一个开源信息共享项目，帮助武汉自组织救援工作更有效、更准确地开展。我们当前在做的事是：建立一个医院、工厂、采购等信息实时同步的数据服务，同时召集所有希望对这次抗击病毒战役进行贡献的人，让每个具有相关技能的人都可以参与相关主题的开发工作，用开源的社区文化，以自组织协作的方式完成。
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.header}>加入我们</Text>
            <Text style={{ lineHeight: 18 }}>
              如果你也想加入我们，可以通过以下方式：
            </Text>
            <View>
              <ListItem
                title="加入我们"
                rightAvatar={
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL('https://github.com/wuhan2020/wuhan2020')
                    }>
                    点击此链接了解详情
                  </Text>
                }
              />
              <ListItem
                title="GitHub"
                rightAvatar={
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL('https://github.com/wuhan2020/wuhan2020')
                    }>
                    GitHub
                  </Text>
                }
              />
            </View>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.header}>建议</Text>
            <Text style={{ lineHeight: 18 }}>
              如果你有任何好的建议，无论是对我们的项目还是这个App都可以发邮件至
            </Text>
            <Text
              style={[styles.link, { marginVertical: 5 }]}
              onPress={() => Linking.openURL('mailto:liu.feiwood@gmail.com')}>
              liu.feiwood@gmail.com
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.header}>其他信息</Text>
            <ListItem title="版本" rightAvatar={<Text>1.0.0</Text>} />
            <ListItem title="技术" rightAvatar={<Text>React Native</Text>} />
            <ListItem
              title="代码库"
              rightAvatar={
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL(
                      'https://github.com/wuhan2020/wuhan2020-frontend-react-native-app',
                    )
                  }>
                  GitHub
                </Text>
              }
            />
            <ListItem
              title="作者"
              rightAvatar={
                <Text
                  style={styles.link}
                  onPress={() =>
                    Linking.openURL('https://github.com/geastwood')
                  }>
                  geastwood（飞）
                </Text>
              }
            />
          </View>
          <Divider style={styles.divider} />
        </View>
      </ScrollView>
    </StatusBarSafeLayout>
  );
}

About.navigationOptions = {
  title: '关于',
};

export default About;
