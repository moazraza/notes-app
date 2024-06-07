# import openai
# import os
# from dotenv import load_dotenv
# from concurrent.futures import ThreadPoolExecutor, TimeoutError
#
# load_dotenv()
# key = os.environ.get("OPENAI_PASSWORD")
# client = openai.OpenAI(api_key=key)
#
#
# def get_gpt_answer(question, timeout_duration=10):
#     try:
#         with ThreadPoolExecutor() as executor:
#             future = executor.submit(fetch_completion, question)
#             return future.result(timeout=timeout_duration)
#     except TimeoutError:
#         return "No result"
#
# def fetch_completion(question):
#     completion = client.chat.completions.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "user", "content": question},
#         ]
#     )
#
#     if completion.choices:
#         output = completion.choices[0].message.content
#     else:
#         output = "No response generated."
#
#     return output
#
# # To deal with some format issue in user input
# def word_process(word):
#     return word
# def gpt_interpreter(word):
#     word = word_process(word)
#     question = "Explain {} in short words".format(word)
#     result = get_gpt_answer(question)
#     return result
#
