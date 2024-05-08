# coding: utf-8
import eel
from transformers import AutoModelForCausalLM, AutoTokenizer

@eel.expose
def generate(prompt):
    model = AutoModelForCausalLM.from_pretrained("./src/assets/story-model")

    tokenizer = AutoTokenizer.from_pretrained("./src/assets/story-model")

    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    output = model.generate(input_ids, max_length = 1000, num_beams=1)

    output_text = tokenizer.decode(output[0], skip_special_tokens=True)

    print(output_text)
    
    return output_text


if __name__ == '__main__':
    eel.init('client')
    eel.start({"port": 3000}, host="localhost", port=8888, mode='chrome-app', cmdline_args=['--start-fullscreen', '--app'])
