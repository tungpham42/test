import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Select,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  message,
  Layout,
  ConfigProvider,
  Divider,
} from "antd";
import {
  CodeOutlined,
  BugOutlined,
  SendOutlined,
  ShakeOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "./App.css";

const { Title, Text } = Typography;
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const { Content } = Layout;

// Define the expected API response
interface ApiResponse {
  result: string;
}

// Define the Form values
interface FormValues {
  framework: string;
  prompt: string;
}

const TddGuidelineGenerator: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [markdownResult, setMarkdownResult] = useState<string>("");

  // Form submit handler
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    setMarkdownResult(""); // Clear previous results

    try {
      const finalPrompt = `Provide a TDD (Test-Driven Development) guideline and code example for ${values.framework}. Context/Feature: ${values.prompt}`;

      const response = await axios.post<ApiResponse>(
        "https://api.soft.io.vn/test",
        { prompt: finalPrompt },
      );

      setMarkdownResult(response.data.result);
      message.success("Awesome! Your TDD Guidelines are ready.");
    } catch (error) {
      console.error("API Error:", error);
      message.error(
        "Oops! Failed to fetch the TDD guideline. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          colorPrimary: "#4f46e5",
          borderRadius: 12,
          colorTextBase: "#1e293b",
          controlHeightLG: 48,
        },
      }}
    >
      <Layout className="app-layout">
        <Content
          style={{
            maxWidth: 850,
            margin: "0 auto",
            width: "100%",
            padding: "60px 20px",
          }}
        >
          {/* Header section */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge">
              <ShakeOutlined style={{ marginRight: 8 }} />
              AI Powered Workflow
            </div>
            <Title
              level={1}
              style={{
                fontWeight: 800,
                margin: "0 0 16px 0",
                fontSize: "2.8rem",
              }}
            >
              <span className="gradient-text">TDD Guideline Generator</span>
            </Title>
            <Text style={{ fontSize: "1.1rem", color: "#64748b" }}>
              Write better code faster. Generate strict, production-ready
              Test-Driven <br />
              Development guidelines and boilerplate for your stack in seconds.
            </Text>
          </div>

          {/* Input Form Card */}
          <Card
            bordered={false}
            className="glass-card"
            style={{ padding: "10px" }}
          >
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label={
                  <span>
                    <CodeOutlined
                      style={{ marginRight: 6, color: "#4f46e5" }}
                    />
                    Programming Language / Framework
                  </span>
                }
                name="framework"
                rules={[
                  {
                    required: true,
                    message: "Please select a language or framework to begin.",
                  },
                ]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Type to search or select your tech stack..."
                  style={{ width: "100%" }}
                  suffixIcon={<CodeOutlined />}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  <OptGroup label="JavaScript / TypeScript Frontend">
                    <Option value="ReactJS">ReactJS</Option>
                    <Option value="NextJS">NextJS</Option>
                    <Option value="Vue.js">Vue.js</Option>
                    <Option value="Nuxt.js">Nuxt.js</Option>
                    <Option value="Angular">Angular</Option>
                    <Option value="Svelte">Svelte / SvelteKit</Option>
                    <Option value="SolidJS">SolidJS</Option>
                  </OptGroup>

                  <OptGroup label="Node.js Backend">
                    <Option value="Node.js (Raw)">Node.js (Raw)</Option>
                    <Option value="Express.js">Express.js</Option>
                    <Option value="NestJS">NestJS</Option>
                    <Option value="Fastify">Fastify</Option>
                  </OptGroup>

                  <OptGroup label="PHP Ecosystem">
                    <Option value="PHP (Raw)">PHP (Vanilla)</Option>
                    <Option value="Laravel">Laravel</Option>
                    <Option value="Symfony">Symfony</Option>
                    <Option value="CodeIgniter">CodeIgniter</Option>
                  </OptGroup>

                  <OptGroup label="Python Ecosystem">
                    <Option value="Python (Raw)">Python</Option>
                    <Option value="Django">Django</Option>
                    <Option value="Flask">Flask</Option>
                    <Option value="FastAPI">FastAPI</Option>
                  </OptGroup>

                  <OptGroup label="Java & Kotlin Ecosystem">
                    <Option value="Java (Raw)">Java</Option>
                    <Option value="Kotlin (Raw)">Kotlin</Option>
                    <Option value="Spring Boot">Spring Boot</Option>
                    <Option value="Quarkus">Quarkus</Option>
                  </OptGroup>

                  <OptGroup label="C# / .NET">
                    <Option value="C#">C#</Option>
                    <Option value="ASP.NET Core">ASP.NET Core</Option>
                    <Option value="Blazor">Blazor</Option>
                  </OptGroup>

                  <OptGroup label="Ruby Ecosystem">
                    <Option value="Ruby (Raw)">Ruby</Option>
                    <Option value="Ruby on Rails">Ruby on Rails</Option>
                  </OptGroup>

                  <OptGroup label="Go & Rust">
                    <Option value="Go">Go (Golang)</Option>
                    <Option value="Gin (Go)">Gin (Go)</Option>
                    <Option value="Rust">Rust</Option>
                    <Option value="Actix (Rust)">Actix (Rust)</Option>
                  </OptGroup>

                  <OptGroup label="Mobile Development">
                    <Option value="React Native">React Native</Option>
                    <Option value="Flutter">Flutter</Option>
                    <Option value="Swift / iOS">Swift (iOS)</Option>
                    <Option value="Android (Kotlin/Java)">
                      Android (Native)
                    </Option>
                  </OptGroup>

                  <OptGroup label="C / C++">
                    <Option value="C">C</Option>
                    <Option value="C++">C++</Option>
                  </OptGroup>
                </Select>
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    <BugOutlined style={{ marginRight: 6, color: "#4f46e5" }} />
                    Feature Description
                  </span>
                }
                name="prompt"
                rules={[
                  {
                    required: true,
                    message:
                      "Please describe the feature you are trying to build.",
                  },
                ]}
              >
                <TextArea
                  size="large"
                  rows={5}
                  placeholder="e.g., I want to build a user authentication login form that accepts an email and password, and returns a JWT token..."
                  style={{ resize: "none" }}
                />
              </Form.Item>

              <Divider dashed style={{ borderColor: "#cbd5e1" }} />

              <Form.Item style={{ marginBottom: 0, marginTop: 10 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SendOutlined />}
                  loading={loading}
                  block
                  className="generate-btn"
                >
                  Generate Tests & Guidelines
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Markdown Result Card */}
          {(loading || markdownResult) && (
            <Card
              bordered={false}
              className="glass-card"
              style={{ marginTop: 32, padding: "10px" }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <Spin size="large" />
                  <div
                    style={{ marginTop: 20, color: "#64748b", fontWeight: 500 }}
                  >
                    Crafting your test suites and guidelines...
                  </div>
                </div>
              ) : (
                <div className="markdown-container">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <Title level={2} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <Title level={3} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <Title level={4} {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p {...props} style={{ marginBottom: "1em" }} />
                      ),
                    }}
                  >
                    {markdownResult}
                  </ReactMarkdown>
                </div>
              )}
            </Card>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default TddGuidelineGenerator;
