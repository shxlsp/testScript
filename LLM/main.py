# from llama_cpp import Llama

# # 指定模型路径
# model_path = "Phi-3.5-mini-instruct-Q4_K_M.gguf"
# # model_path = "phi-4-q4.gguf"

# # llm = Llama(model_path=model_path)
# llm = Llama(model_path=model_path)
# response = llm(
#     "请从以下内容中提取出开会的具体时间，开会人和地点，并按照如下格式返回\{ time: 'xxx', place: 'xxx', user: 'xxx' \}：'小明 今天下午3点咱们一起开会把。'",
#     max_tokens=150,  # 适当减少回答长度
#     temperature=0.5,  # 适当降低温度，生成更准确的答案
#     top_p=0.9         # 控制生成内容的多样性
# )
# print(response["choices"][0]["text"])

from jinja2 import Template
from llama_cpp import Llama

# 模型路径
model_path = "Phi-3.5-mini-instruct-Q4_K_M.gguf"
llm = Llama(model_path=model_path)

# 模拟的消息
messages = [
    {"role": "system", "content":  "你是一个非常聪明的助手，你拥有两项技能，不需要做出额外的回答，只需要回答当前的问题"},
     {"role": "system", "content": "技能1：分析当前user指令，如果user指令信息中不包含会议、开会等相关信息，则不需要处理该信息。否则分析开会人、开会时间、开会地点。并格式化该数据返回给user。数据格式如下\{ \"time\": \"xxx\", user: \"xxx\", place: \"xxx\" \}"},
     {"role": "system", "content": "技能2：当user输入“你好”时，返回user“世界”"},
    {"role": "user", "content": "小敏，今天晚上8点，去我家开会"},
]
        


# 模板字符串
template_str = """
{% for message in messages %}
  {% if message['role'] == 'system' and message['content'] %}
    <|system|> {{ message['content'] }} <|end|>
  {% elif message['role'] == 'user' %}
    <|user|> {{ message['content'] }} <|end|>
  {% elif message['role'] == 'assistant' %}
    <|assistant|> {{ message['content'] }} <|end|>
  {% endif %}
{% endfor %}
{% if add_generation_prompt %}
  <|assistant|> 
{% else %}
  <|end_of_text|>
{% endif %}
"""

# 创建 Jinja 模板对象
template = Template(template_str)

# 渲染生成的对话输入文本
rendered_text = template.render(messages=messages, add_generation_prompt=False)

# 打印生成的文本
print("发送给模型的文本:")
print(rendered_text)

# 发送给模型并获取响应
response = llm(rendered_text, max_tokens=200, temperature=0.4, top_p=0.9)

# 打印模型的回应
print("\n模型的回答:")
print(response["choices"][0]["text"])
